import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginService, logout as logoutService, checkAuth, getCsrfTokenPublic } from '../services/authService';
import { useLocation } from 'react-router-dom';

// Definición de la interfaz del contexto
interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, csrfToken: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  csrfToken: string | null;
}

// Creación del contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Lista de rutas públicas
const publicRoutes = ['/login', '/register', '/password-recovery'];

// Componente proveedor de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Función de login que usa el servicio de login
const login = async (username: string, password: string, csrfToken: string) => {
  try {
    // Verifica que el token CSRF público esté disponible antes de intentar iniciar sesión
    if (!csrfToken) {
      throw new Error('CSRF token no disponible');
    }

    console.log("Intentando iniciar sesión con usuario:", username);

    // Llama a loginService y pasa las credenciales y el CSRF token público
    const data = await loginService(username, password, csrfToken); 
    console.log("Respuesta del login:", data);

    // Actualiza el estado del contexto con el usuario autenticado y cambia el estado a "autenticado"
    setUser(data.user);
    setIsAuthenticated(true);

    // Guarda el nuevo token CSRF autenticado en el estado del contexto para las solicitudes protegidas
    setCsrfToken(data.csrfToken);
    console.log("Inicio de sesión exitoso. Usuario autenticado:", data.user);
    
  } catch (error) {
    // Maneja cualquier error durante el inicio de sesión
    console.error('Error en el inicio de sesión:', error);
    throw new Error('Error en el inicio de sesión');
  }
};

  // Función de logout
  const logout = async () => {
    try {
      console.log("Cerrando sesión...");
      await logoutService();
      setUser(null);
      setIsAuthenticated(false);
      console.log("Cierre de sesión exitoso.");
    } catch (error) {
      console.error("Error en el cierre de sesión:", error);
      throw new Error('Error al cerrar sesión');
    }
  };

  // Verificación de autenticación y obtención del CSRF token
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isPublicRoute = publicRoutes.includes(location.pathname);

        if (isPublicRoute) {
          // Obtener token CSRF público en rutas públicas
          const csrfPublicData = await getCsrfTokenPublic();
          setCsrfToken(csrfPublicData);
          console.log("Token CSRF público obtenido y guardado:", csrfPublicData);
        } else {
          // Verificamos el JWT y CSRF si no estamos en una página pública
          const data = await checkAuth();
          console.log("Respuesta de verificación de autenticación:", data);

          if (data.authenticated) {
            setUser(data.user); // Si el usuario está autenticado, guardamos los datos
            setIsAuthenticated(true);
            setCsrfToken(data.csrfToken); // Actualizamos el token CSRF después de la verificación
          } else {
            console.log("El usuario no está autenticado.");
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); // Quitamos el estado de carga después de la verificación
      }
    };

    verifyAuth(); // Ejecutamos la verificación al cargar la aplicación
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, csrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};
