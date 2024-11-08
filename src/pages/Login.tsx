import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
  useTheme,  // Importar el tema
} from '@mui/material';
import Grid from '@mui/material/Grid2';

const Login = () => {
  const { login, isAuthenticated, csrfToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme(); // Acceder al tema

  // Función para manejar el envío del formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!csrfToken) {
      setError('No se ha obtenido el token CSRF público.');
      return;
    }

    try {
      setLoading(true);
      await login(username, password, csrfToken);
      setError(null);
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error de inicio de sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/home';
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="lg" style={{ height: '100vh' }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ height: '100%' }}
      >
        {/* Panel derecho */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: theme.palette.background.default, // Fondo del theme
            }}
          >
            <Typography variant="h4" gutterBottom align="center" color={theme.palette.primary.main}>
              Iniciar sesión
            </Typography>
            {error && (
              <Alert severity="error" style={{ marginBottom: '1rem' }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                type="text"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  '& label.Mui-focused': {
                    color: theme.palette.accent.main, // Color del label en foco
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.accent.main, // Color del borde en foco
                    },
                    color: theme.palette.text.primary, // Color del texto cuando el usuario escribe
                  },
                }}
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  '& label.Mui-focused': {
                    color: theme.palette.accent.main, // Color del label en foco
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.accent.main, // Color del borde en foco
                    },
                    color: theme.palette.text.primary, // Color del texto cuando el usuario escribe
                  },
                }}
              />
              <Box textAlign="right">
                <Link href="/password-recovery" underline="hover" color={theme.palette.primary.main}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  borderRadius: '50px', // Botón redondeado
                  backgroundColor: theme.palette.accent.main, // Color principal del tema
                  '&:hover': {
                    backgroundColor: theme.palette.accent.light, // Color más claro en hover
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Login'}
              </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿No tienes cuenta?{' '}
              <Link href="/register" underline="hover" color={theme.palette.primary.main}>
                Regístrate
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
