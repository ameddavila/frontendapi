import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LogoProps {
  open: boolean;
}

const Logo: React.FC<LogoProps> = ({ open }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: open ? theme.spacing(2) : theme.spacing(1),
        backgroundColor: theme.palette.accent.main, // Fondo con el color acento del tema
        borderBottom: `1px solid ${theme.palette.primary.dark}`, // Línea divisoria
        color: theme.palette.text.primary, // Color del texto según el tema
      }}
    >
      {open ? (
        <img
          src="/src/assets/logo.png"
          alt="Logo completo SIS-AMED"
          style={{ width: '180px', height: '60px' }} // Tamaño del logo cuando el sidebar está expandido
        />
      ) : (
        <img
          src="/src/assets/icon.png"
          alt="Icono SIS-AMED"
          style={{ width: '40px', height: '40px' }} // Tamaño del ícono cuando el sidebar está contraído
        />
      )}
    </Box>
  );
};

export default Logo;
