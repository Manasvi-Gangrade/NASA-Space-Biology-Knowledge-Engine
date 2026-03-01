import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "data", "engine.sqlite");

function ensureDirectory(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

ensureDirectory(path.join(__dirname, "data"));

const db = new Database(DB_PATH, { fileMustExist: false });

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const initStatements = [
  `CREATE TABLE IF NOT EXISTS publications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    year INTEGER NOT NULL,
    journal TEXT NOT NULL,
    abstract TEXT NOT NULL,
    organism TEXT NOT NULL,
    condition TEXT NOT NULL,
    system TEXT NOT NULL,
    keywords TEXT NOT NULL,
    citations INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS nasa_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT NOT NULL,
    focus TEXT NOT NULL
  )`,
];

for (const statement of initStatements) {
  db.prepare(statement).run();
}

export function loadPublications(publications) {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO publications (
      id, title, authors, year, journal, abstract, organism, condition, system, keywords, citations
    ) VALUES (
      @id, @title, @authors, @year, @journal, @abstract, @organism, @condition, @system, @keywords, @citations
    )
  `);

  const insertMany = db.transaction((items) => {
    for (const publication of items) {
      insert.run({
        ...publication,
        authors: JSON.stringify(publication.authors),
        keywords: JSON.stringify(publication.keywords),
      });
    }
  });

  insertMany(publications);
}

export function loadSources(sources) {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO nasa_sources (id, name, url, description, focus)
    VALUES (@id, @name, @url, @description, @focus)
  `);

  const insertMany = db.transaction((items) => {
    for (const source of items) {
      insert.run(source);
    }
  });

  insertMany(sources);
}

export function getPublications() {
  const rows = db.prepare("SELECT * FROM publications ORDER BY year DESC, id ASC").all();
  return rows.map((row) => ({
    ...row,
    authors: JSON.parse(row.authors),
    keywords: JSON.parse(row.keywords),
  }));
}

export function searchPublications({ query = "", organism = [], condition = [], system = [] } = {}) {
  const searchQuery = `%${query.trim().toLowerCase()}%`;
  const clauses = [];
  const params = {};

  if (query) {
    clauses.push(`(
      lower(title) LIKE @query OR
      lower(abstract) LIKE @query OR
      lower(organism) LIKE @query OR
      lower(condition) LIKE @query OR
      lower(system) LIKE @query
    )`);
    params.query = searchQuery;
  }

  if (organism.length) {
    clauses.push(`organism IN (${organism.map((_, index) => `@organism${index}`).join(", ")})`);
    organism.forEach((value, index) => {
      params[`organism${index}`] = value;
    });
  }

  if (condition.length) {
    clauses.push(`condition IN (${condition.map((_, index) => `@condition${index}`).join(", ")})`);
    condition.forEach((value, index) => {
      params[`condition${index}`] = value;
    });
  }

  if (system.length) {
    clauses.push(`system IN (${system.map((_, index) => `@system${index}`).join(", ")})`);
    system.forEach((value, index) => {
      params[`system${index}`] = value;
    });
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const queryString = `SELECT * FROM publications ${whereClause} ORDER BY year DESC, id ASC`;

  const rows = db.prepare(queryString).all(params);
  return rows.map((row) => ({
    ...row,
    authors: JSON.parse(row.authors),
    keywords: JSON.parse(row.keywords),
  }));
}

export function getSources() {
  return db.prepare("SELECT * FROM nasa_sources ORDER BY name ASC").all();
}

export function getGraph() {
  const publications = getPublications();
  const nodes = [];
  const edges = [];
  const nodeIndex = new Map();

  const addNode = (node) => {
    if (!nodeIndex.has(node.id)) {
      nodeIndex.set(node.id, node);
      nodes.push(node);
    }
  };

  const baseAngle = (Math.PI * 2) / (publications.length || 1);
  const radius = 220;

  publications.forEach((publication, index) => {
    const pubNode = {
      id: publication.id,
      type: "publication",
      label: publication.id,
      x: 500 + Math.cos(index * baseAngle) * radius,
      y: 350 + Math.sin(index * baseAngle) * radius,
      size: 8,
    };
    addNode(pubNode);

    const organismNode = {
      id: publication.organism,
      type: "organism",
      label: publication.organism,
      x: 500 + Math.cos(index * baseAngle * 0.5) * 130,
      y: 350 + Math.sin(index * baseAngle * 0.5) * 130,
      size: 14,
    };
    addNode(organismNode);
    edges.push({ source: pubNode.id, target: organismNode.id });

    const conditionNode = {
      id: publication.condition,
      type: "condition",
      label: publication.condition,
      x: 500 + Math.cos(index * baseAngle * 0.75) * 160,
      y: 350 + Math.sin(index * baseAngle * 0.75) * 160,
      size: 12,
    };
    addNode(conditionNode);
    edges.push({ source: pubNode.id, target: conditionNode.id });

    const systemNode = {
      id: publication.system,
      type: "system",
      label: publication.system,
      x: 500 + Math.cos(index * baseAngle * 1.25) * 180,
      y: 350 + Math.sin(index * baseAngle * 1.25) * 180,
      size: 12,
    };
    addNode(systemNode);
    edges.push({ source: pubNode.id, target: systemNode.id });

    const geneId = `GENE-${index % 10}`;
    const geneNode = {
      id: `${geneId}-${publication.id}`,
      type: "gene",
      label: geneId,
      x: 500 + Math.cos(index * baseAngle * 1.5) * 100,
      y: 350 + Math.sin(index * baseAngle * 1.5) * 100,
      size: 10,
    };
    addNode(geneNode);
    edges.push({ source: pubNode.id, target: geneNode.id });
  });

  return { nodes, edges };
}

export function initializeDatabase(initialPublications, initialSources) {
  loadPublications(initialPublications);
  loadSources(initialSources);
}
