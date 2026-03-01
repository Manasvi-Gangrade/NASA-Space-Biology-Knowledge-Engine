import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getPublications,
  searchPublications,
  getGraph,
  getSources,
  initializeDatabase,
} from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const publicationsFile = path.join(__dirname, "data", "publications.json");
const sourcesFile = path.join(__dirname, "data", "nasaSources.json");

const shouldInitializeDb = () => {
  try {
    return getPublications().length === 0;
  } catch {
    return true;
  }
};

if (shouldInitializeDb()) {
  const publicationsData = JSON.parse(fs.readFileSync(publicationsFile, "utf-8"));
  const sourcesData = JSON.parse(fs.readFileSync(sourcesFile, "utf-8"));
  initializeDatabase(publicationsData, sourcesData);
}

app.use(cors());
app.use(express.json());

const parseArray = (value) => {
  if (!value) return [];
  return Array.isArray(value)
    ? value.flatMap((item) => String(item).split(",").map((v) => v.trim()).filter(Boolean))
    : String(value).split(",").map((v) => v.trim()).filter(Boolean);
};

app.get("/api/publications", (req, res) => {
  res.json(getPublications());
});

app.get("/api/search", (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const organisms = parseArray(req.query.organism);
  const conditions = parseArray(req.query.condition);
  const systems = parseArray(req.query.system);
  res.json(searchPublications({ query, organism: organisms, condition: conditions, system: systems }));
});

app.get("/api/graph", (req, res) => {
  res.json(getGraph());
});

app.get("/api/sources", (req, res) => {
  res.json(getSources());
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`NASA backend running at http://localhost:${PORT}`);
});
