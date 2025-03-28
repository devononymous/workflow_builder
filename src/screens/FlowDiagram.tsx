import React, { useState, useCallback } from "react";
import { Box, Button, IconButton, Stack, Typography, Tooltip } from "@mui/material";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Node,
} from "reactflow";
import { Save, Add, Delete, Edit, ContentCopy } from "@mui/icons-material";
import SaveWorkflowModal from "../components/SaveWorkflowModal";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 50 },
  },
  {
    id: "2",
    type: "default",
    data: { label: "Script" },
    position: { x: 250, y: 150 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "End" },
    position: { x: 150, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

const FlowDiagram: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const navigate = useNavigate();

  const onConnect = (params: Connection) =>
    setEdges((eds) => addEdge(params, eds));

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {
    setSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    setSaveModalOpen(false);
  };

  // Node manipulation functions using setNodes
  const addNewNode = useCallback(() => {
    const newNodeId = `${nodes.length + 1}`;
    const lastNode = nodes[nodes.length - 1];
    
    setNodes((nds) => [
      ...nds,
      {
        id: newNodeId,
        type: "default",
        data: { label: `Node ${newNodeId}` },
        position: {
          x: lastNode ? lastNode.position.x + 50 : 250,
          y: lastNode ? lastNode.position.y + 100 : 50,
        },
      },
    ]);
  }, [nodes, setNodes]);

  const deleteSelectedNode = useCallback(() => {
    if (!selectedNode) return;
    
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => 
      eds.filter(
        (edge) => 
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  const duplicateNode = useCallback(() => {
    if (!selectedNode) return;
    
    const newNodeId = `${nodes.length + 1}`;
    setNodes((nds) => [
      ...nds,
      {
        ...selectedNode,
        id: newNodeId,
        position: {
          x: selectedNode.position.x + 50,
          y: selectedNode.position.y + 50,
        },
        data: {
          ...selectedNode.data,
          label: `${selectedNode.data.label} (copy)`,
        },
      },
    ]);
  }, [selectedNode, nodes.length, setNodes]);

  const updateNodeLabel = useCallback(() => {
    if (!selectedNode) return;
    
    const newLabel = prompt("Enter new label", selectedNode.data.label);
    if (newLabel) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            };
          }
          return node;
        })
      );
    }
  }, [selectedNode, setNodes]);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header with navigation buttons */}
      <Box
        sx={{
          padding: 1,
          backgroundColor: "background.paper",
          boxShadow: 1,
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            onClick={handleGoBack}
            sx={{
              fontFamily: "Poppins",
              fontSize: { md: "14px", sm: "12px", xs: "10px" },
              textTransform: "capitalize",
              textDecoration: "underline",
              color: "text.primary",
              "&::before": {
                content: '"← "',
                display: "inline-block",
              },
            }}
          >
            Go Back
          </Button>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Poppins",
              fontSize: { md: "14px", sm: "12px", xs: "10px" },
              fontWeight: 400,
            }}
          >
            Untitled
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1}>
          <Tooltip title="Add Node">
            <IconButton onClick={addNewNode} color="primary">
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Node">
            <IconButton 
              onClick={deleteSelectedNode} 
              color="error"
              disabled={!selectedNode}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duplicate Node">
            <IconButton 
              onClick={duplicateNode} 
              color="primary"
              disabled={!selectedNode}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Node">
            <IconButton 
              onClick={updateNodeLabel} 
              color="primary"
              disabled={!selectedNode}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Workflow">
            <IconButton
              color="primary"
              onClick={handleSaveClick}
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 0, 0.1)" },
                "&:active": { backgroundColor: "rgba(255, 255, 0, 0.2)" },
              }}
            >
              <Save sx={{ backgroundColor: "yellow" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* React Flow container */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
        >
          <MiniMap />
          <Controls
            position="bottom-right"
            style={{
              display: "flex",
              gap: "8px",
              padding: "8px",
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <Background />
        </ReactFlow>
      </Box>

      {/* Node selection info */}
      {selectedNode && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            backgroundColor: "background.paper",
            padding: 1,
            borderRadius: 1,
            boxShadow: 2,
            zIndex: 10,
          }}
        >
          <Typography variant="subtitle2">
            Selected: {selectedNode.data.label}
          </Typography>
        </Box>
      )}

      {/* Save Workflow Modal */}
      <SaveWorkflowModal
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveConfirm}
        label={"Save your Workflow"}
        label1={"Name"}
        label2={"Description"}
        input1={""}
        input2={""}
      />
    </Box>
  );
};

export default FlowDiagram;