import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { createNodes, createEdges } from "./flowhelper";

export const RoadmapFlow = ({ steps }) => {
  const initialNodes = createNodes(steps);
  const initialEdges = createEdges(steps);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback(() => {
    const centerX = window.innerWidth / 2 - 150;
    setNodes((nds) =>
      nds.map((node, index) => ({
        ...node,
        position: { x: centerX, y: index * 120 },
      }))
    );
  }, [setNodes]);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default RoadmapFlow;
