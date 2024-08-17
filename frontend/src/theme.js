// theme.js or theme.ts
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme(); // Create theme first

const responsiveTheme = createTheme({
  ...baseTheme, // Spread existing theme
  typography: {
    h6: {
      fontSize: '1.5rem',
      fontWeight: 500,
      [baseTheme.breakpoints.down('xs')]: {
        fontSize: '1rem', // Extra small devices
      },
      [baseTheme.breakpoints.between('xs', 'sm')]: {
        fontSize: '1.25rem', // Small devices
      },
      [baseTheme.breakpoints.between('sm', 'md')]: {
        fontSize: '1.5rem', // Medium devices
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.75rem', // Large devices
      },
    },

    h5: {
        fontSize: '1.7rem',
        fontWeight: 600,
        [baseTheme.breakpoints.down('xs')]: {
          fontSize: '1.2rem', // Extra small devices
        },
        [baseTheme.breakpoints.between('xs', 'sm')]: {
          fontSize: '1.45rem', // Small devices
        },
        [baseTheme.breakpoints.between('sm', 'md')]: {
          fontSize: '1.7rem', // Medium devices
        },
        [baseTheme.breakpoints.up('md')]: {
          fontSize: '1.95rem', // Large devices
        },
      },
  

    subtitle1: {
        fontSize: '1.25rem',
        fontWeight: 100,
        [baseTheme.breakpoints.down('xs')]: {
          fontSize: '0.875rem', // Extra small devices
        },
        [baseTheme.breakpoints.between('xs', 'sm')]: {
          fontSize: '1rem', // Small devices
        },
        [baseTheme.breakpoints.between('sm', 'md')]: {
          fontSize: '1.25rem', // Medium devices
        },
        [baseTheme.breakpoints.up('md')]: {
          fontSize: '1.3rem', // Large devices
        },
      },
  },
});

export default responsiveTheme;
