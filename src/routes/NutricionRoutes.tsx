// src/routes/NutricionRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dias from '../pages/nutricion/Dias';
import TiposComida from '../pages/nutricion/TiposComida';
import TiposPlato from '../pages/nutricion/TiposPlato';
import TiposPaciente from '../pages/nutricion/TiposPaciente';
import Personal from '../pages/nutricion/Personal';
import Menus from '../pages/nutricion/Menus';
import MenusPaciente from '../pages/nutricion/MenusPaciente';
import MenuPeriodo from '../pages/nutricion/MenuPeriodo';
import MenuPeriodoDetalle from '../pages/nutricion/MenuPeriodoDetalle';

const NutricionRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dias" element={<Dias />} />
      <Route path="tipos-comida" element={<TiposComida />} />
      <Route path="tipos-plato" element={<TiposPlato />} />
      <Route path="tipos-paciente" element={<TiposPaciente />} />
      <Route path="personal" element={<Personal />} />
      <Route path="menus" element={<Menus />} />
      <Route path="menus-paciente" element={<MenusPaciente />} />
      <Route path="menu-periodo" element={<MenuPeriodo />} />
      <Route path="menu-periodo-detalle" element={<MenuPeriodoDetalle />} />
    </Routes>
  );
};

export default NutricionRoutes;
