import { publications, buildGraph } from "./data";
export type { Publication, GraphNode, GraphEdge } from "./data";

export type SearchFilters = {
  query?: string;
  organism?: string[];
  condition?: string[];
  system?: string[];
};

export async function fetchPublications(): Promise<Publication[]> {
  return Promise.resolve(publications);
}

export async function searchPublications(filters: SearchFilters = {}): Promise<Publication[]> {
  const query = filters.query?.trim().toLowerCase() ?? "";
  return Promise.resolve(
    publications.filter((publication) => {
      if (
        query &&
        !(
          publication.title.toLowerCase().includes(query) ||
          publication.abstract.toLowerCase().includes(query) ||
          publication.organism.toLowerCase().includes(query) ||
          publication.condition.toLowerCase().includes(query) ||
          publication.system.toLowerCase().includes(query)
        )
      ) {
        return false;
      }
      if (filters.organism?.length && !filters.organism.includes(publication.organism)) return false;
      if (filters.condition?.length && !filters.condition.includes(publication.condition)) return false;
      if (filters.system?.length && !filters.system.includes(publication.system)) return false;
      return true;
    }),
  );
}

export async function fetchGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  return Promise.resolve(buildGraph());
}
