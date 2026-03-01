import type { Publication, GraphNode, GraphEdge } from "./data";
export type { Publication, GraphNode, GraphEdge } from "./data";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export type SearchFilters = {
  query?: string;
  organism?: string[];
  condition?: string[];
  system?: string[];
};

export async function fetchPublications(): Promise<Publication[]> {
  const response = await fetch(`${API_BASE}/api/publications`);
  return response.json();
}

function buildSearchUrl(filters: SearchFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  filters.organism?.forEach((organism) => params.append("organism", organism));
  filters.condition?.forEach((condition) => params.append("condition", condition));
  filters.system?.forEach((system) => params.append("system", system));
  return `${API_BASE}/api/search?${params.toString()}`;
}

export async function searchPublications(filters: SearchFilters = {}): Promise<Publication[]> {
  const url = buildSearchUrl(filters);
  const response = await fetch(url);
  return response.json();
}

export async function fetchGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  const response = await fetch(`${API_BASE}/api/graph`);
  return response.json();
}
