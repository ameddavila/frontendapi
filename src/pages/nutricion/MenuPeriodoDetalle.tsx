// src/pages/nutricion/MenuPeriodoDetalle.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuPeriodoDetalle: React.FC = () => {
  const [menuPeriodoDetalle, setMenuPeriodoDetalle] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/menu-periodo-detalle')
      .then(response => setMenuPeriodoDetalle(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Detalles del Período de Menú</h2>
      <ul>
        {menuPeriodoDetalle.map((detalle: any) => (
          <li key={detalle.id}>Menú ID: {detalle.menuId}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPeriodoDetalle;
