import React from 'react';
import { Box } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';

interface LogoProps {
  open: boolean;
}

const Logo: React.FC<LogoProps> = ({ open }) => {
  const theme = useTheme() as Theme;

  return (
    <Box
      sx={{
        width: '100%', // Asegura que el contenedor ocupe todo el ancho del Drawer
        textAlign: 'center',
        padding: open ? theme.spacing(2) : theme.spacing(1), // Ajusta el padding según el estado
        borderBottom: `1px solid ${theme.palette.primary.dark}`, // Línea divisoria sin separación
        color: theme.palette.text.primary, // Color del texto según el tema
        transition: 'padding 0.3s ease', // Transición suave para el padding
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'flex-start' : 'center', // Alineación según el estado
        paddingLeft: open ? theme.spacing(2) : 0, // Alineación hacia la izquierda cuando está expandido
        boxSizing: 'border-box', // Asegura que la línea ocupe todo el ancho sin margen
      }}
    >
      {open ? (
        <img
          src="/src/assets/logo1.svg" // Ruta de la imagen para el logo completo
          alt="H.S.B."
          style={{ width: '180px', height: '60px', transition: 'width 0.3s ease, height 0.3s ease' }} // Tamaño del logo cuando el sidebar está expandido
        />
      ) : (
        <img
          src="/src/assets/icon.svg" // Ruta de la imagen para el ícono
          alt="Icono SIS-AMED"
          style={{ width: '40px', height: '40px', transition: 'width 0.3s ease, height 0.3s ease' }} // Tamaño del ícono cuando el sidebar está contraído
        />
      )}
    </Box>
  );
};

export default Logo;
