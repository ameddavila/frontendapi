import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: { xs: '8px', sm: '16px' }, // Ajusta el padding para dispositivos móviles
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        position: 'relative',
        bottom: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          position: 'static', // Fijo solo en pantallas pequeñas
        },
      }}
    >
      <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
        © 2024 FrontendAPI
      </Typography>
    </Box>
  );
};

export default Footer;
