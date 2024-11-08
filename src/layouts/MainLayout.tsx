import React, { useState, useEffect } from 'react';
import { Grid, Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { fetchUserMenu, fetchUserDetails } from '../services/authService';

const drawerWidth = 240; // Ancho del sidebar cuando está expandido

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para alternar el estado del sidebar
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Obtener el menú y los detalles del usuario del backend cuando el componente se monta
  useEffect(() => {
    const getMenuAndUserDetails = async () => {
      try {
        const [menu, userDetails] = await Promise.all([fetchUserMenu(), fetchUserDetails()]);
        setMenuItems(menu);
        setUserDetails(userDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    getMenuAndUserDetails();
  }, []);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Grid
        item
        sx={{
          width: drawerOpen ? `${drawerWidth}px` : '60px',
          flexShrink: 0,
          transition: 'width 0.3s ease',
        }}
      >
        <Sidebar open={drawerOpen} menuItems={menuItems} />
      </Grid>

      {/* Contenedor del Header y el Contenido */}
      <Grid item xs sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            height: {
              xs: '56px', // Altura del header en pantallas pequeñas
              sm: '64px', // Altura del header en pantallas grandes
            },
            backgroundColor: 'primary.main',
          }}
        >
          <Header handleDrawerToggle={handleDrawerToggle} open={drawerOpen} userDetails={userDetails} />
        </Box>

        {/* Contenido Principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            padding: 0,
            backgroundColor: '#f5f5f5', // Puedes ajustar el color de fondo aquí si es necesario
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainLayout;
