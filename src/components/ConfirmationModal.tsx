import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogProps,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import { RxCross1 } from "react-icons/rx";

interface ConfirmationModalProps extends Omit<DialogProps, 'onClose'> {
  title: string;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  warningText = "You cannot undo this step",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onClose,
  ...dialogProps
}) => {
  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      aria-labelledby="confirmation-dialog-title"
      maxWidth="xs"
      fullWidth
    >

<Box sx={{
  display: 'flex',
  justifyContent: 'flex-end', 
  alignItems: 'flex-end',     
  height: '100%',
  p: 1
}}>
  <IconButton 
    onClick={onClose}
    size="small"
    sx={{
      '& svg': {
        fontSize: '1rem'
      }
    }}
  >
    <RxCross1 />
  </IconButton>
</Box>
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{
          textAlign: 'center',
          pt: 4,
          fontFamily: 'Poppins',
          fontSize: '12px',  
         
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '16px', 
           
          }}
        >
         " {title}"
        </Typography>
        
      </DialogTitle>

      <DialogContent
        sx={{
          textAlign: 'center',
          pb: 2,
          fontFamily: 'Poppins',
          fontSize: '14px',
        }}
      >
        <Typography
          variant="body2"
          color="error"
          sx={{
            fontFamily: 'Poppins',
            fontSize: '12px', 
           
          }}
        >
         {warningText}
        </Typography>
      </DialogContent>
<Divider sx={{mt:4 , boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'transparent', 
    border: 'none' ,
    height: '2px'}}/>
      <DialogActions
        sx={{
          justifyContent: 'flex-end',
          pb: 1,
          px: 2,
          fontFamily: 'Poppins',
        }}
      >
        
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="outlined"
          color="primary"
          sx={{
            minWidth: 50,
            ml: 2,
            textTransform:"capitalize",
            fontFamily: 'Poppins',
            fontSize: '10px',
          }}
        >
          {confirmText}
        </Button>

        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          sx={{
            minWidth: 50,
            fontFamily: 'Poppins',
            textTransform:"capitalize",
            fontSize: '10px',
          }}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
