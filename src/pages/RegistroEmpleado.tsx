// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';  // Importamos el contexto de autenticación
import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';




const RegistroEmpleado: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();  // Obtenemos el estado de autenticación y el loading
  const navigate = useNavigate();

  useEffect(() => {

    if (!loading && !isAuthenticated) {
        navigate('/login');  
    }
  }, [loading, isAuthenticated, navigate]);

  // Mostrar un indicador de carga mientras verificamos el estado de autenticación
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <p>Verificando autenticación...</p>
      </Box>
    );
  }

  // Mostrar la página Home si el usuario está autenticado
  return (
    <Box component="main" sx={{ width: 100, height: 100 }}>
      <Grid container size={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">REGISTRO DE PERSONAL</Typography>
            <p>AQUI VIENE EL REGITRO DEL PERSONAL PARA LOS NUEVOS BIOMETRICOS</p>
          </Paper>
      </Grid>
    </Box>
  );
};

export default RegistroEmpleado;
