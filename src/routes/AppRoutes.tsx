// src/routes/AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import PrivateRoute from '../components/PrivateRoute';
import RegistroEmpleado from '../pages/RegistroEmpleado';
import AdminBd from '../pages/AdminBd';
import NutricionRoutes from './NutricionRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password-recovery" element={<ForgotPassword />} />

      {/* Rutas protegidas */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/RRHH/registrar-personal" element={<RegistroEmpleado />} />
        <Route path="/administracion/adminbd" element={<AdminBd />} />

        {/* Ruta base para las rutas de Nutrición */}
        <Route path="/nutricion/*" element={<NutricionRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
