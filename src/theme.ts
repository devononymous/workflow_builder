// theme.ts
import { createTheme } from '@mui/material/styles';

// Type declarations for custom variants
declare module '@mui/material/styles' {
  interface TypographyVariants {
    body: React.CSSProperties;
    small: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body?: React.CSSProperties;
    small?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body: true;
    small: true;
  }
}

declare module '@mui/material/styles' {
  interface TypeText {
    inverted: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50',
    },
    secondary: {
      main: '#3498DB',
    },
    error: {
      main: '#EE3425',
    },
    background: {
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#4f4f4f',
      inverted: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: [
      'Zen Kaku Gothic Antique',
      'Poppins',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '.6rem',
      fontWeight: 480,
      lineHeight: 1.5,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Poppins',

      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1.60rem',
      fontWeight: 600,
      fontFamily: 'Poppins',
      lineHeight: 2.75,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      fontFamily: 'Poppins',

      lineHeight: 1.5,
    },
    small: {
      fontSize: '0.775rem',
      fontWeight: 400,
      fontFamily: 'Poppins',

      lineHeight: 1.5,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 600, 
          color: '#00000',
          fontFamily:"Poppins",
          padding:"2px 5px",
          textDecoration: 'underline',
          '&:hover': {
            
            color: '#2C3E50',
          },
        },
      },
    },
  },
});
