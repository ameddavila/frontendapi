import api from './api'; // Instancia de Axios configurada

// === Función centralizada para manejo de errores ===
const handleRequestError = (error: any) => {
  if (error.response?.status === 409) {
    // Manejar error de conflicto, pero no lanzar el error
    alert('Esta configuración de base de datos ya existe.');
    return; // Evitar que se lance el error si ya existe la configuración
  } else if (error.response) {
    // Manejar otros errores devueltos por el servidor
    alert(`Error del servidor: ${error.response.data.message}`);
  } else {
    // Error de red o sin respuesta
    alert('Error de red: No se pudo contactar con el servidor.');
  }

  console.error('Error en la solicitud:', error);
  throw error; // Solo lanzar el error si no es un 409
};

// === Función para obtener el token CSRF de las cookies ===
const getCsrfToken = (): string | null => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrfToken='))
    ?.split('=')[1] || null;

  if (!csrfToken) {
    console.error('Token CSRF no encontrado en las cookies');
    throw new Error('Token CSRF no encontrado');
  }
  return csrfToken;
};

// === Función para verificar si una configuración ya existe ===
const checkIfExists = async (configData: any): Promise<boolean> => {
  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.get('/admin/dbs/configs', {
      params: configData,
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    return response.data.exists || false;
  } catch (error) {
    handleRequestError(error); // Manejo centralizado del error
    return false;
  }
};

// === Obtener todas las configuraciones de bases de datos ===
export const getDatabaseConfigs = async () => {
  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.get('/admin/dbs/configs', {
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    return response.data; // Retorna las configuraciones
  } catch (error) {
    handleRequestError(error); // Manejo del error centralizado
  }
};

// === Obtener una configuración de base de datos por ID ===
export const getDatabaseConfigById = async (id: string) => {
  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.get(`/admin/dbs/configs/${id}`, {
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    return response.data; // Retorna la configuración encontrada por ID
  } catch (error) {
    handleRequestError(error); // Manejo del error centralizado
  }
};

// === Crear una nueva configuración de base de datos ===
export const createDatabaseConfig = async (configData: any) => {
  console.log('Datos enviados al backend:', configData);

  // Verificar si la configuración ya existe
  const exists = await checkIfExists(configData);
  if (exists) {
    // Mostrar el mensaje de conflicto y detener la ejecución
    alert('Esta configuración de base de datos ya existe.');
    return; // No continuar si la configuración ya existe
  }

  // Validación de campos obligatorios
  const requiredFields = ['db_type', 'db_name', 'db_username', 'db_password', 'db_host', 'db_port', 'tipo_bd_id'];
  const missingField = requiredFields.find(field => !configData[field]);
  if (missingField) {
    alert(`Por favor, complete el campo obligatorio: ${missingField}`);
    return;
  }

  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.post('/admin/dbs/configs', configData, {
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    alert('Configuración guardada exitosamente.');
    return response.data; // Retorna la nueva configuración creada
  } catch (error) {
    handleRequestError(error); // Manejo del error centralizado
  }
};

// === Actualizar una configuración existente por ID ===
export const updateDatabaseConfig = async (id: string, updatedData: any) => {
  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.put(`/admin/dbs/configs/${id}`, updatedData, {
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    alert('Configuración actualizada exitosamente.');
    return response.data; // Retorna la configuración actualizada
  } catch (error) {
    handleRequestError(error); // Manejo del error centralizado
  }
};

// === Eliminar una configuración de base de datos por ID ===
export const deleteDatabaseConfig = async (id: string) => {
  try {
    const csrfToken = getCsrfToken(); // Obtener el token CSRF antes de la solicitud
    const response = await api.delete(`/admin/dbs/configs/${id}`, {
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    });
    alert('Configuración eliminada exitosamente.');
    return response.data; // Retorna la respuesta de eliminación
  } catch (error) {
    handleRequestError(error); // Manejo del error centralizado
  }
};
