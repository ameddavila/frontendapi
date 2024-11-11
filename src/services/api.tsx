// src/services/api.ts
import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Configura la URL base de tu backend
  withCredentials: true,  // Asegura que las cookies HttpOnly se envíen en cada solicitud
});

// Interceptor de solicitudes para agregar el CSRF token automáticamente
api.interceptors.request.use(
  async (config) => {
    const csrfToken = localStorage.getItem('csrfToken') || document.cookie.split('; ').find(row => row.startsWith('csrfToken='))?.split('=')[1];
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;  // Añadir el token CSRF en las cabeceras
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
