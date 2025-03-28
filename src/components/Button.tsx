// Button.tsx
import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
  hoverBackground?: string;
  hoverEffect?: string;
}

const StyledButton = styled(Button)<CustomButtonProps>(
  ({ theme, hoverBackground = 'rgba(252, 242, 191, 1)', hoverEffect = 'translateY(-1px)' }) => ({
    border: '1px solid #E0E0E0',
    pl: theme.spacing(1),
    px: theme.spacing(1),
    ml: theme.spacing(3),
    textTransform: 'capitalize',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: hoverBackground,
      transform: hoverEffect,
    },
  })
);

const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  onClick,
  ...props 
}) => {
  return (
    <StyledButton 
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;