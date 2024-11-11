import React, { useState, useEffect } from 'react';
import { Grid, Box, CssBaseline, useTheme } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Importa el Footer
import { fetchUserMenu, fetchUserDetails } from '../services/authService';

const drawerWidth = 240; // Ancho del sidebar cuando está expandido

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme(); // Obtener el tema para aplicar los colores personalizados
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

  // Muestra un mensaje de carga si los datos aún no están disponibles
  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
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

      {/* Contenedor del Header, Contenido y Footer */}
      <Grid item xs sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
        
        {/* Header */}
        <Box
          sx={{
            height: {
              xs: '60px', // Altura del header en pantallas pequeñas
              sm: '60px', // Altura del header en pantallas grandes
            },
            width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 60px)`,
            transition: 'width 0.3s ease',
            marginLeft: drawerOpen ? `${drawerWidth}px` : '60px', // Ajusta el margen según el estado del sidebar
            backgroundColor: theme.palette.primary.main, // Color del fondo del header
            color: theme.palette.text.primary, // Color del texto en el header
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 2, // Padding para el contenido del header
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Header handleDrawerToggle={handleDrawerToggle} open={drawerOpen} userDetails={userDetails} />
        </Box>

        {/* Contenido Principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 }, // Ajusta el padding para pantallas pequeñas y grandes
            overflow: 'auto', // Permite desplazamiento si el contenido es extenso
            backgroundColor: theme.palette.background.paper, // Fondo claro
            color: theme.palette.text.primary,
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer /> {/* Inserta el Footer al final del layout */}
      </Grid>
    </Grid>
  );
};

export default MainLayout;
