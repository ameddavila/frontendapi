import React, { useState } from 'react';
import { Drawer, List, Accordion, AccordionSummary, AccordionDetails, Typography, ListItemIcon, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home'; // Ejemplo de icono para el menu "Home"
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles'; // Importar el tema
import { useNavigate } from 'react-router-dom';
import Logo from './Logo'; // Importar el componente Logo
import { logout } from '../services/authService'; // Importar el servicio de logout

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  menuItems: any[]; // Recibir el menú desde las props
}

const Sidebar: React.FC<SidebarProps> = ({ open, menuItems }) => {
  const theme = useTheme(); // Usar el tema personalizado
  const navigate = useNavigate(); // Para la navegación
  const [expanded, setExpanded] = useState<string | false>(false); // Control del menú expandido
  const [activeSection, setActiveSection] = useState<string | null>(null); // Control del ítem activo

  const handleAccordionToggle = (panel: string) => {
    setExpanded(expanded === panel ? false : panel);
    setActiveSection(panel); // Marcar la sección como activa
  };

  const handleLogout = async () => {
    try {
      await logout();  // Llamada al servicio de logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          transition: 'width 0.5s ease', // Transición suave
          backgroundColor: theme.palette.primary.dark, // Fondo más oscuro para el sidebar
          color: theme.palette.text.primary, // Color del texto principal
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', // Sombra a la derecha
          display: 'flex',
          flexDirection: 'column', // Distribuir el contenido verticalmente
          justifyContent: 'space-between', // Asegurarse de que el contenido esté bien distribuido
          height: '100vh', // Altura completa de la pantalla
          overflowX: 'hidden', // Evitar el scroll lateral
        },
      }}
    >
      {/* Logo en el sidebar */}
      <Box
        sx={{
          paddingBottom: '10px', // Espacio interno para el logo
          borderBottom: `2px solid ${theme.palette.primary.light}`, // Línea divisoria debajo del logo
        }}
      >
        <Logo open={open} />
      </Box>

      {/* Contenedor de los menús */}
      <Box
        sx={{
          flexGrow: 1, // Permitir que el contenedor crezca según el contenido
          overflowY: 'scroll', // Asegura que los menús sean desplazables solo verticalmente
          padding: '10px 5px',
          overflowX: 'hidden', // Quitar el scroll lateral
          '::-webkit-scrollbar': {
            width: '0px', // Quitar el scrollbar en Chrome, Safari y otros navegadores basados en WebKit
          },
          'msOverflowStyle': 'none',  // Quitar el scrollbar en Internet Explorer y Edge
          'scrollbarWidth': 'none',  // Quitar el scrollbar en Firefox
        }}
      >
        <List sx={{ padding: 0 }}>
          {menuItems.map((item, index) => (
            <Accordion
              key={index}
              expanded={open && expanded === item.section} // Expandir solo si el sidebar está abierto
              onChange={() => handleAccordionToggle(item.section)}
              sx={{
                width: '100%',
                boxShadow: 'none', // Sin sombra para un estilo más simple
                color: activeSection === item.section ? theme.palette.text.secondary : theme.palette.text.primary, // Color del texto en el estado activo
                backgroundColor: activeSection === item.section ? theme.palette.accent.main : 'transparent', // Fondo del menú activo
                transition: 'background-color 0.3s ease, color 0.3s ease', // Transición suave para el color y fondo
                borderRadius: '8px', // Bordes redondeados
                margin: '4px 0', // Reducir el espacio entre ítems
                padding: '0 4px', // Reducir el padding lateral para que se vea más compacto
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Efecto de hover más claro
                  transform: 'scale(1.03)', // Efecto visual al pasar el mouse
                  transition: 'all 0.3s ease', // Transición más impactante al hacer hover
                },
              }}
            >
              <AccordionSummary
                expandIcon={open ? <ExpandMoreIcon sx={{ color: activeSection === item.section ? theme.palette.text.secondary : theme.palette.text.primary }} /> : null} // Ícono de expandir
                aria-controls={`${item.section}-content`}
                id={`${item.section}-header`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: open ? 'flex-start' : 'center', // Centrar el contenido cuando el sidebar esté contraído
                  borderRadius: '8px', // Bordes redondeados más notorios
                  color: activeSection === item.section ? theme.palette.text.secondary : theme.palette.text.primary, // Texto blanco cuando está activo
                  padding: '5px 8px', // Reducir el padding
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeSection === item.section ? theme.palette.text.secondary : theme.palette.text.primary,
                    minWidth: open ? '36px' : '30px', // Tamaño reducido del ícono
                  }}
                >
                  {item.icon ? item.icon : <HomeIcon />} {/* Ícono del menú o uno por defecto */}
                </ListItemIcon>
                {open && <Typography sx={{ flexGrow: 1, fontSize: '0.85rem', color: activeSection === item.section ? theme.palette.text.secondary : theme.palette.text.primary }}>{item.section}</Typography>} {/* Texto más pequeño */}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  paddingLeft: open ? 3 : 0, // Espacio para los submenús
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Fondo transparente para los subitems
                  borderRadius: '8px', // Bordes redondeados
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px', // Espacio entre los subitems reducido
                }}
              >
                {item.subsections && item.subsections.length > 0 ? (
                  item.subsections.map((subItem: any, subIndex: number) => (
                    <Button
                      key={subIndex}
                      fullWidth
                      onClick={() => navigate(subItem.path)}
                      sx={{
                        padding: '4px 8px', // Reducir el padding para hacerlos más compactos
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '6px', // Bordes más suaves para los subitems
                        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Sombra suave
                        textTransform: 'none', // No usar mayúsculas
                        fontSize: '0.8rem', // Tamaño de fuente reducido
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.accent.main,
                          transform: 'scale(1.05)', // Efecto al pasar el mouse por el submenú
                        },
                        transition: 'background-color 0.3s ease, color 0.3s ease', // Transición suave
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
                      padding: '4px 8px', // Reducir el padding para hacerlos más compactos
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '6px', // Bordes más suaves para los subitems
                      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Sombra suave
                      textTransform: 'none', // No usar mayúsculas
                      fontSize: '0.8rem', // Tamaño de fuente reducido
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.accent.main,
                        transform: 'scale(1.05)', // Efecto al pasar el mouse por el submenú
                      },
                      transition: 'background-color 0.3s ease, color 0.3s ease', // Transición suave
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

      {/* Botón de Cerrar Sesión siempre fijo al final */}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth={open} // Mostrar el botón en toda la anchura solo si está expandido
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: theme.palette.accent.main,
            '&:hover': {
              backgroundColor: theme.palette.accent.light,
            },
            borderRadius: '8px',
            padding: open ? '8px' : '6px', // Ajustar el padding cuando el sidebar está contraído
            minWidth: open ? '100%' : 'auto', // Mantener el tamaño adecuado cuando está contraído
          }}
        >
          {open && 'Cerrar Sesión'} {/* Mostrar el texto solo si el sidebar está expandido */}
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
