import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, Button, Box, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { databaseConfigValidationSchema } from '../validation/validationSchema';
import { getDatabaseConfigs, createDatabaseConfig, deleteDatabaseConfig } from '../services/databaseConfigService'; // Importar los servicios

// Definir la interfaz para el estado de las configuraciones
interface DatabaseConfig {
  id: string;
  db_type: string;
  db_name: string;
  db_username: string;
  db_host: string;
}

// Definir los tipos de los valores del formulario
interface DatabaseConfigValues {
  db_type: string;
  db_name: string;
  db_instance?: string;
  db_username: string;
  db_password: string;
  db_host: string;
  db_port: number;
  tipo_bd_id: number;
}

// Opciones de tipo de base de datos
const dbTypes = [
  { value: 'SQL Server', label: 'SQL Server' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' }
];

const initialValues: DatabaseConfigValues = {
  db_type: '',
  db_name: '',
  db_instance: '',
  db_username: '',
  db_password: '',
  db_host: '',
  db_port: 5432,
  tipo_bd_id: 1 // Tipo BD default
};

const DatabaseConfigForm = () => {
  const [configs, setConfigs] = useState<DatabaseConfig[]>([]); // Estado para almacenar las configuraciones
  const [loading, setLoading] = useState(true); // Estado de carga

  // Obtener las configuraciones al montar el componente
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const data = await getDatabaseConfigs();
        if (data) {
          setConfigs(data); // Guardar las configuraciones en el estado
        } else {
          setConfigs([]); // Si no hay datos, asegurarse de que sea un array vacío
        }
      } catch (error) {
        console.error('Error al obtener las configuraciones de base de datos:', error);
        setConfigs([]);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchConfigs();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (values: DatabaseConfigValues) => {
    try {
      const newConfig: DatabaseConfig = await createDatabaseConfig(values); // Crear la nueva configuración
      setConfigs([...configs, newConfig]); // Actualizar el estado agregando la nueva configuración
    } catch (error) {
      console.error('Error al crear la configuración de base de datos:', error);
    }
  };

  // Función para eliminar una configuración
  const handleDelete = async (id: string) => {
    try {
      await deleteDatabaseConfig(id); // Llamada al servicio para eliminar la configuración
      setConfigs(configs.filter(config => config.id !== id)); // Eliminar del estado
    } catch (error) {
      console.error(`Error al eliminar la configuración con ID ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Cargando configuraciones...</p>; // Mostrar un mensaje o spinner mientras los datos se cargan
  }
  

  return (
    <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={databaseConfigValidationSchema} // Usar la validación importada
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', width: '100%', maxWidth: 1200 }}>
              <h1 style={{ textAlign: 'center' }}>Database Configuration</h1>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_type"
                    as={TextField}
                    select
                    label="Database Type"
                    fullWidth
                    helperText={<ErrorMessage name="db_type" />}
                    value={values.db_type || ''} // Asegurarse de que nunca sea undefined
                    onChange={handleChange}
                  >
                    {dbTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_name"
                    as={TextField}
                    label="Database Name"
                    fullWidth
                    helperText={<ErrorMessage name="db_name" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_instance"
                    as={TextField}
                    label="Database Instance"
                    fullWidth
                    helperText={<ErrorMessage name="db_instance" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_username"
                    as={TextField}
                    label="Username"
                    fullWidth
                    helperText={<ErrorMessage name="db_username" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_password"
                    as={TextField}
                    label="Password"
                    type="password"
                    fullWidth
                    helperText={<ErrorMessage name="db_password" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_host"
                    as={TextField}
                    label="Host"
                    fullWidth
                    helperText={<ErrorMessage name="db_host" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="db_port"
                    as={TextField}
                    label="Port"
                    type="number"
                    fullWidth
                    helperText={<ErrorMessage name="db_port" />}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Field
                    name="tipo_bd_id"
                    as={TextField}
                    label="Tipo BD ID"
                    type="number"
                    fullWidth
                    helperText={<ErrorMessage name="tipo_bd_id" />}
                  />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Tabla debajo del formulario */}
      <Box sx={{ width: '100%', maxWidth: 1200, mt: 4, boxShadow: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Existing Configurations</h2>
        <TableContainer component={Paper}>
          <Table aria-label="database configurations table">
            <TableHead>
              <TableRow>
                <TableCell>Database Type</TableCell>
                <TableCell>Database Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Host</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {configs && configs.length > 0 ? (
    configs.map((row: DatabaseConfig) => (
      <TableRow key={row?.id}>
        <TableCell>{row?.db_type || 'N/A'}</TableCell>
        <TableCell>{row?.db_name || 'N/A'}</TableCell>
        <TableCell>{row?.db_username || 'N/A'}</TableCell>
        <TableCell>{row?.db_host || 'N/A'}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No configurations found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DatabaseConfigForm;
