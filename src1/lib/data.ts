// Mock NASA Space Biology corpus data

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

export const organisms = [
  "Mus musculus", "Arabidopsis thaliana", "Homo sapiens", "Caenorhabditis elegans",
  "Drosophila melanogaster", "Saccharomyces cerevisiae", "Escherichia coli", "Rattus norvegicus",
];

export const conditions = [
  "Microgravity", "Cosmic Radiation", "Hypergravity", "Hindlimb Unloading",
  "Simulated Mars Gravity", "Solar Particle Event", "Lunar Regolith Exposure",
];

export const systems = [
  "Skeletal", "Muscular", "Cardiovascular", "Immune", "Nervous",
  "Reproductive", "Plant Growth", "Cellular Metabolism", "Gene Expression",
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
  "npj Microgravity", "Life Sciences in Space Research", "Astrobiology",
  "PLOS ONE", "Frontiers in Physiology", "Cell Reports", "Nature Microgravity",
];

function seeded(i: number, mod: number) { return Math.abs(Math.sin(i * 9301 + 49297)) * mod | 0; }

export const publications: Publication[] = titles.map((title, i) => {
  const year = 2008 + seeded(i, 17);
  const orgIdx = seeded(i + 1, organisms.length);
  const condIdx = seeded(i + 2, conditions.length);
  const sysIdx = seeded(i + 3, systems.length);
  return {
    id: `PUB-${1000 + i}`,
    title,
    authors: [
      `${["A.","M.","R.","K.","L.","J.","E.","S."][seeded(i+4,8)]} ${["Patel","Chen","Garcia","Müller","Tanaka","Singh","Novak","Adeyemi"][seeded(i+5,8)]}`,
      `${["D.","P.","T.","N.","O."][seeded(i+6,5)]} ${["Ortega","Kim","Brown","Hassan","Wang"][seeded(i+7,5)]}`,
    ],
    year,
    journal: journals[seeded(i + 8, journals.length)],
    abstract:
      `This study investigates the effects of ${conditions[condIdx].toLowerCase()} on ${organisms[orgIdx]} with focus on the ${systems[sysIdx].toLowerCase()} system. Using high-throughput sequencing and longitudinal phenotyping, we identify key regulatory pathways altered during exposure and propose candidate biomarkers for future long-duration mission planning.`,
    organism: organisms[orgIdx],
    condition: conditions[condIdx],
    system: systems[sysIdx],
    keywords: [conditions[condIdx], systems[sysIdx], "spaceflight", "omics"],
    citations: 5 + seeded(i + 9, 240),
  };
});

// Trend data: publications per year
export const yearTrend = Array.from({ length: 18 }, (_, i) => {
  const year = 2008 + i;
  return {
    year: String(year),
    publications: publications.filter((p) => p.year === year).length + 2 + seeded(i, 9),
    citations: 20 + seeded(i + 50, 180),
  };
});

export const organismDistribution = organisms.map((o) => ({
  name: o.split(" ")[0],
  full: o,
  value: publications.filter((p) => p.organism === o).length + 1 + seeded(o.length, 6),
}));

export const conditionDistribution = conditions.map((c) => ({
  name: c,
  value: publications.filter((p) => p.condition === c).length + 2 + seeded(c.length, 7),
}));

export const systemRadar = systems.slice(0, 6).map((s, i) => ({
  system: s,
  studies: 30 + seeded(i + 11, 60),
  gaps: 10 + seeded(i + 22, 40),
}));

// Knowledge graph
export type GraphNode = {
  id: string; label: string; type: "publication" | "organism" | "condition" | "system" | "gene";
  x: number; y: number; size: number;
};
export type GraphEdge = { source: string; target: string; weight: number };

export function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const cx = 500, cy = 350;

  // condition nodes (inner ring)
  conditions.slice(0, 5).forEach((c, i) => {
    const a = (i / 5) * Math.PI * 2;
    nodes.push({ id: `c-${i}`, label: c, type: "condition", x: cx + Math.cos(a) * 140, y: cy + Math.sin(a) * 140, size: 22 });
  });
  // organism nodes (mid ring)
  organisms.slice(0, 7).forEach((o, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    nodes.push({ id: `o-${i}`, label: o, type: "organism", x: cx + Math.cos(a) * 250, y: cy + Math.sin(a) * 250, size: 18 });
  });
  // system nodes (outer)
  systems.slice(0, 8).forEach((s, i) => {
    const a = (i / 8) * Math.PI * 2;
    nodes.push({ id: `s-${i}`, label: s, type: "system", x: cx + Math.cos(a) * 360, y: cy + Math.sin(a) * 360, size: 16 });
  });
  // gene leaves
  ["TP53","MYOD1","RUNX2","HSP70","SOD2","BMP2","NF-kB","FOXO3"].forEach((g, i) => {
    const a = (i / 8) * Math.PI * 2 + 0.1;
    nodes.push({ id: `g-${i}`, label: g, type: "gene", x: cx + Math.cos(a) * 440, y: cy + Math.sin(a) * 440, size: 12 });
  });

  // edges: condition -> organism -> system -> gene
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i + j) % 2 === 0) edges.push({ source: `c-${i}`, target: `o-${j}`, weight: 1 + ((i + j) % 3) });
    }
  }
  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 8; k++) {
      if ((j * 3 + k) % 4 === 0) edges.push({ source: `o-${j}`, target: `s-${k}`, weight: 1 });
    }
  }
  for (let k = 0; k < 8; k++) {
    edges.push({ source: `s-${k}`, target: `g-${k}`, weight: 2 });
  }
  return { nodes, edges };
}
