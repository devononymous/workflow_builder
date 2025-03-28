import React, { useState } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import DataTable from '../components/DataTable';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the modal component
import "../App.css";
import menu from "../assets/menu.svg";
import menuHover from '../assets/menuHover.svg';
interface Workflow {
  id: number;
  workflowName: string;
  lastEditedOn: string;
  description: string;
}

const Workflow: React.FC = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);
  const [hovered, setHovered] = useState(false);
  
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleOpenDeleteModal = (workflow: Workflow) => {
    setWorkflowToDelete(workflow);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (workflowToDelete) {
      console.log(`Deleting workflow: ${workflowToDelete.workflowName}`);
      // Add your actual delete logic here
      setDeleteModalOpen(false);
      setWorkflowToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setWorkflowToDelete(null);
  };

  return (
    <Paper component={Box} sx={{ padding: '16px', backgroundColor: '#f9f9f9' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton>
        <img       src={hovered ? menuHover : menu} style={{ width: '28px', height: '28px' }}
      alt="menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}/>
        </IconButton>
        <Typography variant="h6" sx={{ paddingLeft: '5px', fontWeight: 600 }}>
          Workflow Builder
        </Typography>
      </Box>

      {/* DataTable Section with delete handlers */}
      <Box sx={{ marginTop: '5px' }}>
        <DataTable 
          onDeleteWorkflow={handleOpenDeleteModal} // Pass the delete handler
        />
      </Box>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={deleteModalOpen}
        title="Are you sure you want to delete"
       onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        warningText="You cannot undo this step"
      />
    </Paper>
  );
};

export default Workflow;