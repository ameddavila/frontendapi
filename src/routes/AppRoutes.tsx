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
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Login siempre será la primera página */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password-recovery" element={<ForgotPassword />} />

     {/* Ruta protegida para Home */}
     <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />  {/* Aquí asegúrate de usar "/home"  */}
        <Route path="RRHH/registrar-personal" element={<RegistroEmpleado />} />  {/* Aquí asegúrate de usar "/home"  registrar-personal*/}
        <Route path="administracion/adminbd" element={<AdminBd />} />  {/* Aquí asegúrate de usar "/home"  registrar-personal*/}
  
      </Route>
    </Routes>
  );
};

export default AppRoutes;
