// src/components/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ textAlign: 'center', padding: '16px' }}>
      <Typography variant="body1">© 2024 FrontendAPI</Typography>
    </Box>
  );
};

export default Footer;
