import * as Yup from 'yup';

// Esquema de validación para DatabaseConfig
export const databaseConfigValidationSchema = Yup.object({
  db_type: Yup.string().required('Database type is required'),
  db_name: Yup.string().required('Database name is required'),
  db_username: Yup.string().required('Username is required'),
  db_password: Yup.string().required('Password is required'),
  db_host: Yup.string().required('Host is required'),
  db_port: Yup.number().required('Port is required').min(1, 'Invalid port number'),
  tipo_bd_id: Yup.number().required('Tipo BD is required')
});

// Aquí puedes agregar otros esquemas de validación para otros formularios
export const otherFormValidationSchema = Yup.object({
  // Validaciones para otro formulario
});
