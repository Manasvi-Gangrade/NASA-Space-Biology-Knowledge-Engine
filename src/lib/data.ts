// Landing page data for the merged design

export const organisms = [
  "Mus musculus",
  "Arabidopsis thaliana",
  "Homo sapiens",
  "Caenorhabditis elegans",
  "Drosophila melanogaster",
  "Saccharomyces cerevisiae",
  "Escherichia coli",
  "Rattus norvegicus",
];

export const conditions = [
  "Microgravity",
  "Cosmic Radiation",
  "Hypergravity",
  "Hindlimb Unloading",
  "Simulated Mars Gravity",
  "Solar Particle Event",
  "Lunar Regolith Exposure",
];

export const systems = [
  "Skeletal",
  "Muscular",
  "Cardiovascular",
  "Immune",
  "Nervous",
  "Reproductive",
  "Plant Growth",
  "Cellular Metabolism",
  "Gene Expression",
];

const titles = [
  "Bone density loss patterns in murine models exposed to long-duration microgravity",
  "Transcriptomic response of Arabidopsis roots to spaceflight conditions on the ISS",
  "Cardiovascular deconditioning markers in astronauts: a six-month longitudinal study",
  "Cosmic radiation-induced DNA damage in human lymphocytes aboard the ISS",
  "Skeletal muscle atrophy mechanisms under simulated microgravity in C. elegans",
  "Yeast cell cycle dynamics in low Earth orbit: an omics-driven analysis",
  "Drosophila innate immunity response to spaceflight oxidative stress",
  "Plant gravitropism and auxin signaling pathways in microgravity environments",
  "Hindlimb unloading rat model: gene expression in soleus muscle fibers",
  "Microbial biofilm formation on spacecraft surfaces under microgravity",
  "Radiation shielding effectiveness for deep-space crewed missions",
  "Cardiac stem cell differentiation under simulated lunar gravity",
  "Spaceflight effects on the gut microbiome of mice on the ISS",
  "Neural plasticity changes in astronauts following long-duration missions",
  "Lettuce cultivation aboard the ISS: nutritional profile assessment",
  "Galactic cosmic ray exposure and cognitive performance in rodent models",
  "Wound healing kinetics in microgravity: epithelial cell migration",
  "Calcium homeostasis disruption in osteocytes under unloading conditions",
  "RNA-seq analysis of immune cell populations after 30-day spaceflight",
  "Mitochondrial bioenergetics adaptation to chronic radiation exposure",
  "Tardigrade survival mechanisms under combined microgravity and UV stress",
  "Embryonic development of zebrafish in simulated reduced gravity",
  "Photosynthetic efficiency of microalgae cultured in lunar regolith simulant",
  "Bone marrow hematopoietic stem cell quiescence in space-flown mice",
  "Vestibular system adaptation timeline in returning ISS crew members",
];

const journals = [
  "npj Microgravity",
  "Life Sciences in Space Research",
  "Astrobiology",
  "PLOS ONE",
  "Frontiers in Physiology",
  "Cell Reports",
  "Nature Microgravity",
];

function seeded(i: number, mod: number) {
  return (Math.abs(Math.sin(i * 9301 + 49297)) * mod) | 0;
}

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract: string;
  organism: string;
  condition: string;
  system: string;
  keywords: string[];
  citations: number;
};

export const publications: Publication[] = titles.map((title, i) => {
  const year = 2008 + seeded(i, 17);
  const orgIdx = seeded(i + 1, organisms.length);
  const condIdx = seeded(i + 2, conditions.length);
  const sysIdx = seeded(i + 3, systems.length);
  return {
    id: `PUB-${1000 + i}`,
    title,
    authors: [
      `${["A.", "M.", "R.", "K.", "L.", "J.", "E.", "S."][seeded(i + 4, 8)]} ${["Patel", "Chen", "Garcia", "Müller", "Tanaka", "Singh", "Novak", "Adeyemi"][seeded(i + 5, 8)]}`,
      `${["D.", "P.", "T.", "N.", "O."][seeded(i + 6, 5)]} ${["Ortega", "Kim", "Brown", "Hassan", "Wang"][seeded(i + 7, 5)]}`,
    ],
    year,
    journal: journals[seeded(i + 8, journals.length)],
    abstract: `This study investigates the effects of ${conditions[condIdx].toLowerCase()} on ${organisms[orgIdx]} with focus on the ${systems[sysIdx].toLowerCase()} system. Using high-throughput sequencing and longitudinal phenotyping, we identify key regulatory pathways altered during exposure and propose candidate biomarkers for future long-duration mission planning.`,
    organism: organisms[orgIdx],
    condition: conditions[condIdx],
    system: systems[sysIdx],
    keywords: [conditions[condIdx], systems[sysIdx], "spaceflight", "omics"],
    citations: 5 + seeded(i + 9, 240),
  };
});

export const yearTrend = Array.from({ length: 18 }, (_, i) => {
  const year = 2008 + i;
  return {
    year: String(year),
    publications: publications.filter((p) => p.year === year).length + 2 + seeded(i, 9),
    citations: 20 + seeded(i + 50, 180),
  };
});

export type GraphNode = {
  id: string;
  type: "organism" | "condition" | "system" | "gene" | "publication";
  label: string;
  x: number;
  y: number;
  size: number;
};

export type GraphEdge = {
  source: string;
  target: string;
};

const genes = [
  "MYOD1",
  "COL1A1",
  "TP53",
  "HIF1A",
  "IL6",
  "FOXO3",
  "SOD2",
  "VEGFA",
  "NOX4",
  "MT-CO1",
];

export function buildGraph() {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const baseAngle = (Math.PI * 2) / publications.length;
  const radius = 220;

  function pushNode(node: GraphNode) {
    if (!nodes.find((existing) => existing.id === node.id)) {
      nodes.push(node);
    }
  }

  publications.forEach((publication, index) => {
    const publicationNode: GraphNode = {
      id: publication.id,
      type: "publication",
      label: publication.id,
      x: 500 + Math.cos(index * baseAngle) * radius,
      y: 350 + Math.sin(index * baseAngle) * radius,
      size: 8,
    };
    pushNode(publicationNode);

    const organismNode: GraphNode = {
      id: publication.organism,
      type: "organism",
      label: publication.organism,
      x: 500 + Math.cos(index * baseAngle * 0.5) * 130,
      y: 350 + Math.sin(index * baseAngle * 0.5) * 130,
      size: 14,
    };
    pushNode(organismNode);
    edges.push({ source: publicationNode.id, target: organismNode.id });

    const conditionNode: GraphNode = {
      id: publication.condition,
      type: "condition",
      label: publication.condition,
      x: 500 + Math.cos(index * baseAngle * 0.75) * 160,
      y: 350 + Math.sin(index * baseAngle * 0.75) * 160,
      size: 12,
    };
    pushNode(conditionNode);
    edges.push({ source: publicationNode.id, target: conditionNode.id });

    const systemNode: GraphNode = {
      id: publication.system,
      type: "system",
      label: publication.system,
      x: 500 + Math.cos(index * baseAngle * 1.25) * 180,
      y: 350 + Math.sin(index * baseAngle * 1.25) * 180,
      size: 12,
    };
    pushNode(systemNode);
    edges.push({ source: publicationNode.id, target: systemNode.id });

    const geneId = genes[index % genes.length];
    const geneNode: GraphNode = {
      id: `${geneId}-${publication.id}`,
      type: "gene",
      label: geneId,
      x: 500 + Math.cos(index * baseAngle * 1.5) * 100,
      y: 350 + Math.sin(index * baseAngle * 1.5) * 100,
      size: 10,
    };
    pushNode(geneNode);
    edges.push({ source: publicationNode.id, target: geneNode.id });
  });

  return { nodes, edges };
}
