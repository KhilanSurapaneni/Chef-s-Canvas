import { createTheme } from '@mui/material/styles';
import { green, orange, red, brown } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[600], // Basil green
      contrastText: '#fff',
    },
    secondary: {
      main: orange[600], // Carrot orange
      contrastText: '#fff',
    },
    error: {
      main: red[600],
      contrastText: '#fff',
    },
    background: {
      default: '#fff', // Beige
      paper: '#fff',
    },
    text: {
      primary: brown[900], // Dark brown
      secondary: brown[700], // Medium brown
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      color: brown[900],
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '2rem',
      fontWeight: 700,
      color: brown[900],
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.75rem',
      fontWeight: 700,
      color: brown[900],
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: brown[900],
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1.25rem',
      fontWeight: 700,
      color: brown[900],
    },
    h6: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '1rem',
      fontWeight: 700,
      color: brown[900],
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1rem',
      color: brown[700],
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '0.875rem',
      color: brown[700],
    },
    button: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: green[600],
          '&:hover': {
            backgroundColor: green[800],
          },
        },
        containedSecondary: {
          backgroundColor: orange[600],
          '&:hover': {
            backgroundColor: orange[800],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '32px',
          paddingBottom: '32px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '16px',
        },
      },
    },
  },
});

export default theme;
