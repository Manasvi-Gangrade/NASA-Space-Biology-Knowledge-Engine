import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicationsPath = path.join(__dirname, "..", "data", "publications.json");
const sourcesPath = path.join(__dirname, "..", "data", "nasaSources.json");

const publications = JSON.parse(fs.readFileSync(publicationsPath, "utf-8"));
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf-8"));

initializeDatabase(publications, sources);
console.log(`Loaded ${publications.length} publications and ${sources.length} NASA source records into the SQLite store.`);
