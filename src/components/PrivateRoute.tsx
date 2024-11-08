// src/components/PrivateRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import MainLayout from '../layouts/MainLayout';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica la autenticación (mientras loading es true), no redirigimos ni mostramos contenido
  if (loading) {
    return <div>Verificando autenticación...</div>;  // Puedes personalizar este loading
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, mostrar la página protegida
  // Si el usuario está autenticado, renderizar el MainLayout y el contenido de la ruta
  return (
    <MainLayout>
      <Outlet /> {/* Renderizará las rutas anidadas dentro del MainLayout */}
    </MainLayout>
  );
};

export default PrivateRoute;
