import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../services/authService'; // Importamos el servicio de logout

interface HeaderProps {
  handleDrawerToggle: () => void;  // Función para alternar el sidebar
  open: boolean;  // Prop para indicar si el sidebar está abierto o colapsado
  userDetails: {
    id: number;
    login: string;
    nombres: string;
    apellidos: string;
    email: string;
    celular: string;
  };  // Detalles del usuario
}

const drawerWidth = 240;  // Ancho del sidebar expandido

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle, open, userDetails }) => {
  // Estado para el menú desplegable
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Función para abrir el menú
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();  // Llamada al servicio de logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - 60px)`,  // Cambiar ancho según el estado del sidebar
        marginLeft: open ? `${drawerWidth}px` : '60px',  // Ajustar margen según el estado del sidebar
        transition: 'width 0.3s ease',  // Transición suave para el cambio de tamaño
        backgroundColor: (theme) => theme.palette.primary.main, // Usa el color del tema
        ['@media (max-width:600px)']: { // Ajuste para pantallas móviles
          width: '100%', 
          marginLeft: 0,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}  // Para expandir/contraer el sidebar
          sx={{ mr: 2 }}  // Asegurar que siempre esté visible
        >
          <MenuIcon />  {/* Ícono para alternar el sidebar */}
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          SIS-AMED {/* Título personalizado */}
        </Typography>
        {/* Avatar con funcionalidad de abrir menú */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt={`${userDetails.nombres} ${userDetails.apellidos}`} src="/static/images/avatar/1.jpg" />
        </IconButton>
        {/* Menú desplegable que muestra detalles del usuario */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem disabled>{`${userDetails.nombres} ${userDetails.apellidos}`}</MenuItem> {/* Nombre completo */}
          <MenuItem>{userDetails.email}</MenuItem> {/* Correo electrónico */}
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem> {/* Acción de logout */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
