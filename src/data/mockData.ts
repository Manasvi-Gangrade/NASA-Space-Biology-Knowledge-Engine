export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  mission: string;
  biologicalSystem: string;
  spaceCondition: string;
  objective: string;
  keyFindings: string[];
  conclusion: string;
  futureSuggestions: string;
  tags: string[];
  relevanceScore: number;
}

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Microgravity Effects on Human Bone Density During Long-Duration ISS Missions",
    authors: ["Dr. Sarah Chen", "Dr. James Rodriguez", "Dr. Ayumi Tanaka"],
    year: 2024,
    mission: "ISS Expedition 70",
    biologicalSystem: "Human",
    spaceCondition: "Microgravity",
    objective: "Investigate bone mineral density loss in astronauts during 6-month ISS stays",
    keyFindings: [
      "Average 1.5% bone density loss per month in weight-bearing bones",
      "Exercise countermeasures reduced loss by 40%",
      "Recovery takes 3-4 years post-mission",
    ],
    conclusion: "Long-duration microgravity exposure causes significant bone loss that current exercise protocols only partially mitigate.",
    futureSuggestions: "Investigate pharmaceutical countermeasures combined with resistive exercise for Mars missions.",
    tags: ["bone density", "microgravity", "countermeasures", "ISS"],
    relevanceScore: 95,
  },
  {
    id: "2",
    title: "Arabidopsis Gene Expression Under Simulated Mars Radiation",
    authors: ["Dr. Elena Petrov", "Dr. Michael Zhang"],
    year: 2023,
    mission: "Ground Simulation - JSC",
    biologicalSystem: "Plant",
    spaceCondition: "Radiation",
    objective: "Analyze transcriptomic changes in Arabidopsis thaliana under Mars-equivalent radiation",
    keyFindings: [
      "428 genes differentially expressed after 30-day exposure",
      "DNA repair pathways upregulated 3.2x",
      "Root growth reduced by 23%",
    ],
    conclusion: "Plants show significant stress responses but maintain viability under Mars radiation levels.",
    futureSuggestions: "Develop radiation-resistant crop varieties through targeted gene editing.",
    tags: ["plant biology", "radiation", "gene expression", "Mars"],
    relevanceScore: 88,
  },
  {
    id: "3",
    title: "Gut Microbiome Shifts in Astronauts: A Longitudinal Study",
    authors: ["Dr. Priya Sharma", "Dr. Thomas Berg", "Dr. Lisa Kim"],
    year: 2024,
    mission: "ISS Expedition 68-69",
    biologicalSystem: "Microbe",
    spaceCondition: "Microgravity",
    objective: "Track gut microbiome composition changes during spaceflight and recovery",
    keyFindings: [
      "Bacteroidetes decreased 35% during flight",
      "Firmicutes increased disproportionately",
      "Immune-related metabolites altered significantly",
    ],
    conclusion: "Spaceflight causes reproducible gut dysbiosis with immune implications.",
    futureSuggestions: "Develop probiotic interventions tailored for spaceflight conditions.",
    tags: ["microbiome", "gut health", "immunity", "ISS"],
    relevanceScore: 91,
  },
  {
    id: "4",
    title: "Cardiac Remodeling in Microgravity: MRI Analysis of ISS Crew",
    authors: ["Dr. Robert Alonso", "Dr. Yuki Watanabe"],
    year: 2023,
    mission: "ISS Expedition 67",
    biologicalSystem: "Human",
    spaceCondition: "Microgravity",
    objective: "Characterize cardiac structural changes using pre/post-flight MRI",
    keyFindings: [
      "Left ventricular mass decreased 8-12%",
      "Cardiac sphericity index increased",
      "Changes partially reversible within 6 months",
    ],
    conclusion: "Microgravity induces measurable cardiac remodeling that may pose risks for long-duration missions.",
    futureSuggestions: "Investigate artificial gravity countermeasures for cardiovascular protection.",
    tags: ["cardiovascular", "cardiac", "microgravity", "MRI"],
    relevanceScore: 87,
  },
  {
    id: "5",
    title: "Lettuce Growth Optimization in the Veggie Plant Growth System",
    authors: ["Dr. Gioia Massa", "Dr. Ray Wheeler"],
    year: 2022,
    mission: "ISS - Veggie Facility",
    biologicalSystem: "Plant",
    spaceCondition: "Microgravity",
    objective: "Optimize red romaine lettuce cultivation parameters aboard ISS",
    keyFindings: [
      "LED spectrum adjustment improved yield 18%",
      "Nutrient uptake efficiency lower in microgravity",
      "Edible biomass quality comparable to ground controls",
    ],
    conclusion: "Space-grown crops can supplement astronaut diets with proper cultivation protocols.",
    futureSuggestions: "Scale up to larger crop varieties and test closed-loop nutrient recycling.",
    tags: ["crop production", "Veggie", "LED", "nutrition"],
    relevanceScore: 82,
  },
  {
    id: "6",
    title: "Radiation-Induced DNA Damage in Drosophila Aboard ISS",
    authors: ["Dr. Kenji Nakamura", "Dr. Anna Kowalski"],
    year: 2023,
    mission: "ISS BioLab",
    biologicalSystem: "Animal",
    spaceCondition: "Radiation",
    objective: "Quantify DNA double-strand breaks in Drosophila melanogaster during spaceflight",
    keyFindings: [
      "2.4x increase in DSBs compared to ground controls",
      "Repair efficiency reduced by 15%",
      "Transgenerational effects observed in F1 generation",
    ],
    conclusion: "Space radiation causes persistent DNA damage with potential heritable consequences.",
    futureSuggestions: "Investigate radioprotective compounds and shielding strategies for crewed missions.",
    tags: ["DNA damage", "Drosophila", "radiation", "genetics"],
    relevanceScore: 90,
  },
];

export const trendData = [
  { year: 2018, human: 45, plant: 22, microbe: 15, animal: 12 },
  { year: 2019, human: 52, plant: 28, microbe: 18, animal: 15 },
  { year: 2020, human: 48, plant: 35, microbe: 25, animal: 18 },
  { year: 2021, human: 58, plant: 38, microbe: 32, animal: 20 },
  { year: 2022, human: 65, plant: 42, microbe: 38, animal: 25 },
  { year: 2023, human: 72, plant: 48, microbe: 45, animal: 28 },
  { year: 2024, human: 80, plant: 55, microbe: 52, animal: 32 },
];

export const conditionDistribution = [
  { name: "Microgravity", value: 45, fill: "hsl(230, 65%, 55%)" },
  { name: "Radiation", value: 28, fill: "hsl(168, 55%, 42%)" },
  { name: "Isolation", value: 12, fill: "hsl(28, 85%, 56%)" },
  { name: "Combined", value: 15, fill: "hsl(270, 55%, 58%)" },
];

export const knowledgeNodes = [
  { id: "microgravity", label: "Microgravity", type: "condition", x: 400, y: 300 },
  { id: "radiation", label: "Radiation", type: "condition", x: 700, y: 200 },
  { id: "isolation", label: "Isolation", type: "condition", x: 650, y: 450 },
  { id: "human", label: "Human Biology", type: "system", x: 200, y: 150 },
  { id: "plant", label: "Plant Biology", type: "system", x: 150, y: 400 },
  { id: "microbe", label: "Microbiology", type: "system", x: 300, y: 500 },
  { id: "bone", label: "Bone Density", type: "finding", x: 300, y: 250 },
  { id: "cardiac", label: "Cardiac Changes", type: "finding", x: 250, y: 100 },
  { id: "gene-expr", label: "Gene Expression", type: "finding", x: 500, y: 150 },
  { id: "microbiome", label: "Gut Microbiome", type: "finding", x: 350, y: 400 },
  { id: "dna-damage", label: "DNA Damage", type: "finding", x: 600, y: 350 },
  { id: "crop-growth", label: "Crop Growth", type: "finding", x: 250, y: 350 },
  { id: "iss", label: "ISS", type: "mission", x: 550, y: 100 },
  { id: "mars", label: "Mars Missions", type: "mission", x: 800, y: 350 },
  { id: "moon", label: "Lunar Gateway", type: "mission", x: 750, y: 500 },
];

export const knowledgeEdges = [
  { from: "microgravity", to: "bone" },
  { from: "microgravity", to: "cardiac" },
  { from: "microgravity", to: "microbiome" },
  { from: "microgravity", to: "crop-growth" },
  { from: "radiation", to: "gene-expr" },
  { from: "radiation", to: "dna-damage" },
  { from: "human", to: "bone" },
  { from: "human", to: "cardiac" },
  { from: "plant", to: "gene-expr" },
  { from: "plant", to: "crop-growth" },
  { from: "microbe", to: "microbiome" },
  { from: "iss", to: "microgravity" },
  { from: "iss", to: "radiation" },
  { from: "mars", to: "radiation" },
  { from: "mars", to: "isolation" },
  { from: "moon", to: "radiation" },
  { from: "isolation", to: "microbiome" },
];

export const insightSuggestions = [
  {
    id: "1",
    type: "gap" as const,
    title: "Limited Research on Combined Stressors",
    description: "Only 15% of studies examine combined effects of microgravity AND radiation. Mars missions will expose crews to both simultaneously.",
    confidence: 92,
    priority: "high" as const,
  },
  {
    id: "2",
    type: "hypothesis" as const,
    title: "Microbiome-Bone Loss Connection",
    description: "Gut microbiome shifts may exacerbate bone density loss through altered calcium metabolism pathways.",
    confidence: 78,
    priority: "medium" as const,
  },
  {
    id: "3",
    type: "recommendation" as const,
    title: "Prioritize Plant Radiation Studies",
    description: "With Mars mission planning accelerating, radiation-resistant crop development should be prioritized for food sustainability.",
    confidence: 85,
    priority: "high" as const,
  },
  {
    id: "4",
    type: "gap" as const,
    title: "Insufficient Long-Duration Microbiome Data",
    description: "Most microbiome studies cover 6-month missions. 2-3 year Mars transit data is critically needed.",
    confidence: 88,
    priority: "high" as const,
  },
  {
    id: "5",
    type: "hypothesis" as const,
    title: "Epigenetic Inheritance of Space Adaptations",
    description: "Transgenerational effects observed in Drosophila suggest epigenetic mechanisms may carry space adaptations to offspring.",
    confidence: 65,
    priority: "medium" as const,
  },
];
