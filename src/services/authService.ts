// src/services/authService.ts
import api from './api'; // Instancia de Axios configurada

/**
 * Servicio de inicio de sesión que envía las credenciales del usuario y el token CSRF público al backend.
 * Si la autenticación es exitosa, obtiene un nuevo token CSRF autenticado y lo almacena en las cookies.
 * @param login - El nombre de usuario o identificador de inicio de sesión
 * @param password - La contraseña del usuario
 * @param csrfToken - El token CSRF público para las solicitudes iniciales
 * @returns Los datos de la respuesta del servidor (usuario autenticado y tokens)
 */
export const loginService = async (login: string, password: string, csrfToken: string) => {
  try {
    console.log('Intentando iniciar sesión con:', { login, password });
    console.log('Token CSRF público enviado en el header:', csrfToken);

    // Realiza la solicitud de inicio de sesión con las credenciales y el token CSRF público
    const response = await api.post(
      '/auth/login',
      { login, password },
      {
        withCredentials: true,  // Permite enviar cookies HttpOnly al backend
        headers: {
          'x-csrf-token': csrfToken,  // Envía el token CSRF público en el encabezado para verificación inicial
        },
      }
    );

    console.log('Respuesta del servidor en loginService:', response);

    // Verifica si el backend devuelve un nuevo token CSRF autenticado en la respuesta
    if (response.data && response.data.csrfToken) {
      const newCsrfToken = response.data.csrfToken;
      console.log('Nuevo token CSRF recibido después del login:', newCsrfToken);

      // Almacena el nuevo token CSRF en las cookies del navegador
      document.cookie = `csrfToken=${newCsrfToken}; path=/;`;

      // Retorna el usuario y el nuevo token CSRF autenticado para ser utilizado en el contexto global
      return { user: response.data.user, csrfToken: newCsrfToken };
    } else {
      console.warn('No se recibió un nuevo token CSRF en la respuesta del servidor.');
      throw new Error('Error al recibir el token CSRF después del inicio de sesión');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;  // Lanza el error para que el contexto lo maneje
  }
};



// Servicio de logout
export const logout = async () => {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });  // Enviar cookies
    window.location.href = '/login';  // Redirigir al login después de cerrar sesión
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Verificación de autenticación
export const checkAuth = async () => {
    try {
      // Obtener el CSRF token de las cookies
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))?.split('=')[1];
  
      if (!csrfToken) {
        console.error('No se encontró el token CSRF en las cookies');
        throw new Error('No se encontró el token CSRF');
      }
  
      // Realizar la solicitud de verificación de autenticación
      const response = await api.get('/auth/check', {
        withCredentials: true,  // Enviar cookies JWT
        headers: {
          'x-csrf-token': csrfToken,  // Enviar el CSRF token en el header
        },
      });
  
      // Retornar la respuesta del servidor
      return response.data;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      throw error;
    }
  };

// Servicio para obtener CSRF token público
export const getCsrfTokenPublic = async (): Promise<string | null> => {
    try {
      const response = await api.get('auth/csrf-token');  // Endpoint del CSRF público
      const csrfToken = response.data.csrfToken;
      return csrfToken;  // Devolver el token
    } catch (error) {
      console.error('Error al obtener el token CSRF público:', error);
      return null;  // Manejo de errores
    }
  };

// Función para obtener el menú del usuario desde el endpoint /api/users/me
export const fetchUserMenu = async () => {
    try {
      // Obtener el token CSRF de las cookies
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
  
      if (!csrfToken) {
        console.error('Token CSRF no encontrado en las cookies');
        throw new Error('Token CSRF no encontrado');
      }
  
      // Realizar la solicitud GET para obtener el menú del usuario
      const response = await api.get('/users/me', {
        withCredentials: true,  // Asegurarse de que las cookies se envíen
        headers: {
          'x-csrf-token': csrfToken,  // Incluir el token CSRF en los encabezados
        },
        
      });
      console.log(response.data.menu);
      return response.data.menu;  // Devolver el menú del usuario
    } catch (error) {
      console.error('Error al obtener el menú del usuario:', error);
      throw error;
    }
  };
  
  // Función para obtener el detalle del usuario desde el endpoint /api/users/me
export const fetchUserDetails = async () => {
    try {
      // Obtener el token CSRF de las cookies
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
  
      if (!csrfToken) {
        console.error('Token CSRF no encontrado en las cookies');
        throw new Error('Token CSRF no encontrado');
      }
  
      // Realizar la solicitud GET para obtener los detalles del usuario
      const response = await api.get('/users/me', {
        withCredentials: true,  // Asegurarse de que las cookies se envíen
        headers: {
          'x-csrf-token': csrfToken,  // Incluir el token CSRF en los encabezados
        },
      });
  
      return response.data.user;  // Devolver los detalles del usuario
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
      throw error;
    }
  };
  
  // Servicio para verificar CSRF público en páginas públicas
export const checkPublicCsrf = async () => {
    const response = await api.get('/auth/check-public', {
      withCredentials: true // Enviar cookies para obtener el token CSRF público
    });
    return response.data;
  };
