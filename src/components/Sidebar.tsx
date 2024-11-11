import React, { useState } from 'react';
import { Drawer, List, Accordion, AccordionSummary, AccordionDetails, Typography, ListItemIcon, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home'; // Ejemplo de icono para el menú "Home"
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Assignment from '@mui/icons-material/Assignment';
import { useTheme } from '@mui/material/styles'; // Importar el tema personalizado
import { useNavigate } from 'react-router-dom';
import Logo from './Logo'; // Componente de logo
import { logout } from '../services/authService'; // Servicio para cerrar sesión
import { Theme } from '@mui/material/styles';

const drawerWidth = 240; // Define el ancho del sidebar cuando está expandido

interface SidebarProps {
  open: boolean;
  menuItems: any[]; // Elementos del menú que serán recibidos como props
}

const Sidebar: React.FC<SidebarProps> = ({ open, menuItems }) => {
  const theme = useTheme(); // Obtiene el tema personalizado
  const navigate = useNavigate(); // Hook para navegación entre rutas
  const [expanded, setExpanded] = useState<string | false>(false); // Estado para el panel expandido
  const [activeSection, setActiveSection] = useState<string | null>(null); // Estado para el ítem activo

  // Controla la expansión y colapso de cada acordeón
  const handleAccordionToggle = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
    setActiveSection(panel); // Marca la sección como activa al expandirse
  };

  // Manejo del cierre de sesión llamando al servicio correspondiente
  const handleLogout = async () => {
    try {
      await logout(); // Llama al servicio de logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60, // Cambia el ancho según el estado de apertura
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          transition: 'width 0.5s ease', // Animación de transición del ancho
          backgroundColor: theme.palette.background.default, // Fondo del sidebar
          color: theme.palette.text.primary, // Color de texto en el sidebar
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', // Sombra para un efecto de profundidad
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Componente Logo en la parte superior del sidebar */}
      <Box
        sx={{
          width: '100%', // Asegura que el contenedor del logo ocupe todo el ancho
          height: { xs: 56, sm: 64 }, // Coincide con la altura del Header en diferentes tamaños de pantalla
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'flex-start' : 'center',
          paddingLeft: open ? '16px' : '0', // Añade padding cuando está expandido
          transition: 'width 0.3s ease, padding 0.3s ease', // Transición suave para ancho y padding
          backgroundColor: (theme: Theme) => theme.palette.primary.main, // Especifica el tipo Theme
          borderBottom: (theme: Theme) => `2px solid ${theme.palette.primary.light}`, // Especifica el tipo Theme también aquí
        
          // Ajustes para pantallas pequeñas
          ['@media (max-width:600px)']: { 
            height: 56, // Coincide con la altura del Header en pantallas pequeñas
            paddingLeft: 0, // Elimina padding en pantallas móviles si no es necesario
          },
        }}
        
      >
        <Logo open={open} />
      </Box>

      {/* Contenedor de los elementos del menú */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll', // Permite desplazarse si el contenido es extenso
          padding: '10px 5px',
          overflowX: 'hidden',
          '::-webkit-scrollbar': {
            width: '0px', // Oculta la barra de desplazamiento en Chrome
          },
          'msOverflowStyle': 'none', // Oculta la barra en Edge/IE
          'scrollbarWidth': 'none', // Oculta la barra en Firefox
        }}
      >
        <List sx={{ padding: 0 }}>
          {menuItems.map((item, index) => (
            <Accordion
              key={index}
              expanded={open && expanded === item.section} // Control de expansión
              onChange={() => handleAccordionToggle(item.section)}
              sx={{
                width: '100%',
                boxShadow: 'none',
                color: activeSection === item.section ? theme.palette.error.main : theme.palette.text.primary, // Cambia color cuando está activo
                backgroundColor: activeSection === item.section ? theme.palette.accent.main : 'transparent', // Cambia fondo cuando está activo
                transition: 'background-color 0.3s ease, color 0.3s ease',
                borderRadius: '8px',
                margin: '4px 0',
                padding: '0 8px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light, // Fondo en hover
                  color: theme.palette.error.main, // Color en hover
                  transform: 'scale(1.03)', // Efecto de escala al hacer hover
                },
              }}
            >
              <AccordionSummary
                expandIcon={open ? <ExpandMoreIcon sx={{ color: activeSection === item.section ? theme.palette.error.main : theme.palette.text.primary }} /> : null}
                aria-controls={`${item.section}-content`}
                id={`${item.section}-header`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: open ? 'flex-start' : 'center',
                  borderRadius: '8px',
                  color: activeSection === item.section ? theme.palette.common.white : theme.palette.error.main,
                  padding: '8px 12px', // Ajuste del padding
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeSection === item.section ? theme.palette.error.main : theme.palette.error.main,
                    minWidth: open ? '36px' : '30px',
                  }}
                >
                  {/* Asignación de íconos basada en el nombre de la sección */}
                  {(() => {
                      switch (item.section) {
                        case 'RRHH':
                          return <PeopleIcon />;
                        case 'Seguros':
                          return <SecurityIcon />;
                        case 'Planificación':
                          return <Assignment/>;
                        case 'Administración':
                          return <SettingsIcon />;
                        case 'Dashboard':
                          return <DashboardIcon />;
                        case 'Serv. Nutrición':
                          return <RestaurantIcon />;
                        default:
                          return <HomeIcon />; // Ícono predeterminado si no se encuentra coincidencia
                      }
                  })()}
                </ListItemIcon>
                {open && <Typography sx={{ flexGrow: 1, fontSize: '0.95rem', fontWeight: 'bold' }}>{item.section}</Typography>}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  paddingLeft: open ? 2 : 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fondo sutil para los detalles
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {/* Sub-elementos del acordeón */}
                {item.subsections && item.subsections.length > 0 ? (
                  item.subsections.map((subItem: any, subIndex: number) => (
                    <Button
                      key={subIndex}
                      fullWidth
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        padding: '6px 12px',
                        color: theme.palette.common.white,
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '6px',
                        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Sombra para resaltar los botones
                        textTransform: 'none',
                        fontSize: '0.85rem',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.common.white,
                        },
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                      }}
                    >
                      {subItem.section}
                    </Button>
                  ))
                ) : (
                  <Button
                    fullWidth
                    onClick={() => navigate(item.path)}
                    sx={{
                      padding: '6px 12px',
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '6px',
                      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
                      textTransform: 'none',
                      fontSize: '0.85rem',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.accent.main,
                      },
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                  >
                    {item.section}
                  </Button>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Box>

      {/* Botón de Cerrar Sesión fijo al final del sidebar */}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth={open}
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: theme.palette.accent.main,
            '&:hover': {
              backgroundColor: theme.palette.error.main,
            },
            borderRadius: '8px',
            padding: open ? '8px' : '6px',
            minWidth: open ? '100%' : 'auto',
          }}
        >
          {open && 'Cerrar Sesión'}
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
