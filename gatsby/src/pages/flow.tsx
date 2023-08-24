import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: -100, y: 0 }, data: { label: "Contentful" } },
  { id: "2", position: { x: 100, y: 0 }, data: { label: "Drupal" } },
  { id: "3", position: { x: 0, y: 100 }, data: { label: "Connect" } },
  { id: "4", position: { x: -175, y: 200 }, data: { label: "NextJS" } },
  { id: "5", position: { x: 0, y: 200 }, data: { label: "Remix" } },
  { id: "6", position: { x: 175, y: 200 }, data: { label: "Astro" } },
];
const initialEdges = [
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e3-5", source: "3", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
export const Head: HeadFC = () => (
  <title>Flow | Money &amp; Money Capital</title>
);
