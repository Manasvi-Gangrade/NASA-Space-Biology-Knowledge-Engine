import { knowledgeNodes, knowledgeEdges } from "@/data/mockData";
import { useState } from "react";

const typeColors: Record<string, { bg: string; border: string }> = {
  condition: { bg: "hsl(230, 65%, 55%)", border: "hsl(230, 65%, 60%)" },
  system: { bg: "hsl(168, 55%, 42%)", border: "hsl(168, 55%, 50%)" },
  finding: { bg: "hsl(28, 85%, 56%)", border: "hsl(28, 85%, 62%)" },
  mission: { bg: "hsl(270, 55%, 58%)", border: "hsl(270, 55%, 65%)" },
};

const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const connectedNodes = selectedNode
    ? knowledgeEdges
        .filter((e) => e.from === selectedNode || e.to === selectedNode)
        .flatMap((e) => [e.from, e.to])
    : [];

  const isHighlighted = (nodeId: string) =>
    !selectedNode || nodeId === selectedNode || connectedNodes.includes(nodeId);

  const isEdgeHighlighted = (edge: { from: string; to: string }) =>
    !selectedNode || edge.from === selectedNode || edge.to === selectedNode;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Knowledge Graph</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Explore relationships between biological systems, space conditions, and findings
        </p>
      </div>

      <div className="flex flex-wrap gap-6 items-center">
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: colors.bg }} />
            <span className="text-muted-foreground capitalize">{type}</span>
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          Click nodes to filter · Click background to reset
        </span>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <svg
          viewBox="0 0 900 600"
          className="w-full h-[500px] lg:h-[600px]"
          onClick={(e) => {
            if ((e.target as Element).tagName === "svg" || (e.target as Element).tagName === "rect") {
              setSelectedNode(null);
            }
          }}
        >
          <rect width="900" height="600" fill="hsl(220, 20%, 97%)" />

          {knowledgeEdges.map((edge, i) => {
            const from = knowledgeNodes.find((n) => n.id === edge.from);
            const to = knowledgeNodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            const highlighted = isEdgeHighlighted(edge);
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={highlighted ? "hsl(230, 65%, 55%)" : "hsl(220, 15%, 85%)"}
                strokeWidth={highlighted ? 1.5 : 1}
                strokeOpacity={highlighted ? 0.5 : 0.3}
              />
            );
          })}

          {knowledgeNodes.map((node) => {
            const colors = typeColors[node.type];
            const highlighted = isHighlighted(node.id);
            const isSelected = selectedNode === node.id;
            const radius = isSelected ? 30 : 24;
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(selectedNode === node.id ? null : node.id);
                }}
                opacity={highlighted ? 1 : 0.3}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill={isSelected ? colors.bg : "hsl(0, 0%, 100%)"}
                  stroke={colors.border}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isSelected ? "hsl(0, 0%, 100%)" : "hsl(220, 30%, 12%)"}
                  fontSize={10}
                  fontFamily="IBM Plex Sans, sans-serif"
                  fontWeight={isSelected ? 600 : 400}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {selectedNode && (
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-sm font-medium text-foreground mb-2">
            {knowledgeNodes.find((n) => n.id === selectedNode)?.label}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            Connected to {connectedNodes.filter((n) => n !== selectedNode).length} concepts
          </p>
          <div className="flex flex-wrap gap-2">
            {connectedNodes
              .filter((n) => n !== selectedNode)
              .map((n) => {
                const node = knowledgeNodes.find((kn) => kn.id === n);
                const colors = typeColors[node?.type || "condition"];
                return (
                  <span
                    key={n}
                    className="px-3 py-1 rounded-md text-xs font-medium border"
                    style={{ borderColor: colors.bg, color: colors.bg }}
                  >
                    {node?.label}
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;
