// src/services/authService.ts
import api from './api'; // Instancia de Axios configurada


export const loginService = async (login: string, password: string, csrfToken: string) => {
  try {
    // Logs para verificación del flujo de datos
    console.log('Intentando iniciar sesión con:', { login, password });
    console.log('Token CSRF público enviado en el header:', csrfToken);

    const response = await api.post(
      '/auth/login',
      { login, password },
      {
        withCredentials: true,  // Enviar cookies HttpOnly
        headers: {
          'x-csrf-token': csrfToken,  // Usar el CSRF token público para el login
        },
      }
    );

    console.log('Respuesta del servidor en loginService:', response);

    // Verificar si el backend devuelve un nuevo token CSRF y almacenarlo en las cookies
    if (response.data && response.data.csrfToken) {
      const newCsrfToken = response.data.csrfToken;
      console.log('Nuevo token CSRF recibido después del login:', newCsrfToken);

      // Guardar el nuevo CSRF token en el estado de autenticación
      document.cookie = `csrfToken=${newCsrfToken}; path=/;`;

      // Actualizar el valor del token CSRF en el frontend (si tienes una forma de actualizarlo en el contexto global)
    } else {
      console.warn('No se recibió un nuevo token CSRF en la respuesta del servidor.');
    }

    // Devolver los datos de autenticación (usuario, tokens) al contexto de autenticación
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
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
