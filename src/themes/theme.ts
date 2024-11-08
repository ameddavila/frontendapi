import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Azul oscuro
      light: '#34495e', // Azul más claro
      dark: '#1a252f',  // Azul más oscuro
    },
    secondary: {
      main: '#ecf0f1', // Gris claro
      light: '#bdc3c7', // Gris más claro
      dark: '#7f8c8d',  // Gris oscuro
    },
    warning: {
      main: '#e67e22',  // Naranja suave
      light: '#f39c12', // Dorado suave
    },
    background: {
      default: '#f8f9fa', // Fondo neutro claro
    },
    accent: {
      main: '#e67e22', // Color naranja suave para acentos
      light: '#f39c12', // Color dorado suave
    },
    text: {
      primary: '#050505',  // Texto claro (ajustado para mejor visibilidad)
      secondary: '#7f8c8d',  // Texto gris oscuro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 600,
      color: '#ecf0f1',  // Texto claro
    },
    body1: {
      color: '#7f8c8d', // Texto gris oscuro
    },
  },
  transitions: {
    duration: {
      standard: 300, // Ajuste de la duración estándar de transiciones
    },
  },
});

export default theme;
