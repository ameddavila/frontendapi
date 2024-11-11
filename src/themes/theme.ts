import { createTheme } from '@mui/material/styles';
import '../types/theme.d.ts';

// Extiende la interfaz de MUI para incluir la paleta personalizada 'accent'
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

// Crea un tema personalizado para el diseño del proyecto
const theme = createTheme({
  palette: {
    // Colores principales (para elementos como la barra de navegación)
    primary: {
      main: '#003366', // Azul oscuro para el fondo de la barra de navegación y elementos principales
      light: '#34495e', // Azul más claro como variación
      dark: '#001a33',  // Azul aún más oscuro para detalles
    },
    // Color de error para elementos como mensajes de advertencia
    error: { main: '#FF0000' },
    // Colores secundarios (para acentos importantes y botones)
    secondary: {
      main: '#F26E29', // Naranja fuerte para botones destacados y acentos
      light: '#FBD4BF', // Naranja claro como variación
      dark: '#FF4F10',  // Naranja oscuro para resaltar
    },
    // Colores de advertencia (para alertas específicas)
    warning: {
      main: '#FF6F00',  // Naranja fuerte para alertas o acentos especiales
      light: '#FFA040', // Naranja claro como opción de variación
    },
    // Colores de fondo para la aplicación
    background: {
      default: '#E5F1FF', // Fondo gris claro de la interfaz
      paper: '#fafafa',   // Fondo blanco para elementos tipo 'paper'
    },
    // Color personalizado de acento para elementos destacados adicionales
    accent: {
      main: '#84bae6', // Azul claro como color de acento
      light: '#3d4955', // Variación del color de acento
    },
    // Colores de texto para mejorar la accesibilidad y estética
    text: {
      primary: '#2C3E50',  // Azul oscuro para el texto principal
      secondary: '#7F8C8D',  // Gris oscuro para el texto secundario
    },
  },
  // Configuración tipográfica para estilos de texto en toda la aplicación
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Fuente base
    h6: {
      fontWeight: 600,         // Peso del texto de encabezado para h6
      color: '#F8F9FA',        // Blanco para encabezados en fondo oscuro
    },
    body1: {
      color: '#2C3E50',        // Azul oscuro para el texto principal
    },
  },
  // Añade breakpoints personalizados
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // Duraciones de transición para suavizar las animaciones
  transitions: {
    duration: {
      standard: 300, // Duración estándar en milisegundos
    },
  },
});

export default theme;
