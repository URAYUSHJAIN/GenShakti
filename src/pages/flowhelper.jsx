export const createNodes = (steps) => {
  return steps.map((step, index) => ({
    id: `${index}`,
    type: "default",
    position: { x: 250, y: index * 100 },
    data: { label: step },
    style: {
      background: "#fff",
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid #2E7D32",
      width: 300,
    },
  }));
};

export const createEdges = (steps) => {
  return steps.slice(0, -1).map((_, index) => ({
    id: `e${index}-${index + 1}`,
    source: `${index}`,
    target: `${index + 1}`,
    animated: true,
    style: { stroke: "#2E7D32" },
  }));
};
