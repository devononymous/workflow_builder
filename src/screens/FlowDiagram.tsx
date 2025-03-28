import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
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
} from "reactflow";
import { Save } from "@mui/icons-material";
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
  const navigate = useNavigate();

  const onConnect = (params: Connection) =>
    setEdges((eds) => addEdge(params, eds));

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {
    console.log("Save button clicked - modal should open");
    setSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    console.log("Save confirmed");
    // Add your save logic here
    setSaveModalOpen(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header with navigation buttons */}
      <Box
        sx={{
          padding: 1,
          backgroundColor: "background.paper",
          boxShadow: 1,
          zIndex: 10,
          width: "220px",
          position: "relative",
          left: 20,
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

      {/* Save Workflow Modal - Must be at root level */}
      <SaveWorkflowModal
        open={saveModalOpen}
        onClose={() => {
          console.log("Modal closed");
          setSaveModalOpen(false);
        }}
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
