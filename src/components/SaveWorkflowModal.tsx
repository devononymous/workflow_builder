import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SaveWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  label: string;
  label1: string;
  label2: string;
  input1: string;
  input2: string;

  saveButtonText?: string;
}

const SaveWorkflowModal: React.FC<SaveWorkflowModalProps> = ({
  open,
  onClose,
  onSave,
  label,
  label1,
  label2,
  saveButtonText = "Save",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "10px",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              textAlign: "left",
              fontSize: { md: "16px", sm: "14px", xs: "12px" },
            }}
          >
            {label}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          flexDirection="column"
          display="flex"
          gap={0.5}
          sx={{ textAlign: "left" }}
        >
          <Typography
            variant="small"
            fontWeight={400}
            sx={{
              textAlign: "left",
              fontSize: { md: "14px", sm: "12px", xs: "10px" },
            }}
          >
            {label1}
          </Typography>
          <TextField
            placeholder="Type here..."
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "8px",
              fontSize: "0.5rem",
              height: {
                xs: "30px",
                sm: "40px", 
                md: "50px", 
              },
              "& .MuiInputBase-input": {
                fontSize: {
                  xs: "0.75rem",
                  sm: "1rem", 
                },
                fontWeight: 400,
                height: "100%",
              },
              "& .MuiOutlinedInput-root": {
                height: {
                  xs: "30px",
                  sm: "40px",
                  md: "50px",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: {
                  xs: "0.55rem", 
                  sm: ".9rem",
                  
                },
                fontWeight: 400,
              },
            }}
          />
        </Box>

        <Box
          flexDirection="column"
          display="flex"
          gap={0.5}
          sx={{ textAlign: "left", marginTop: "16px" }}
        >
          <Typography
            variant="small"
            fontWeight={400}
            sx={{
              textAlign: "left",
              fontSize: { md: "14px", sm: "12px", xs: "10px" },
            }}
          >
            {label2}
          </Typography>
          <textarea
            placeholder="Type here..."
            cols={50}
            rows={4}
            style={{
              padding: "12px",
              fontFamily: "Poppins",
              border: "25%",
              borderColor: "1px solid #dfdfdf",
              borderRadius: "8px",
            }}
          />
        </Box>
        {/* Add any content here if needed */}
      </DialogContent>
<Divider sx={{mt:2 , boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'transparent', 
    border: 'none' ,
    height: '2px'}}/>      <DialogActions sx={{ justifyContent: "flex-end", padding: "16px 24px" }}>
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            backgroundColor: "#EE3425",
            color: "#fff",
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          {saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveWorkflowModal;
