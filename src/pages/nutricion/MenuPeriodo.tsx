// src/pages/nutricion/MenuPeriodo.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuPeriodo: React.FC = () => {
  const [menuPeriodo, setMenuPeriodo] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/menu-periodo')
      .then(response => setMenuPeriodo(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Períodos de Menú</h2>
      <ul>
        {menuPeriodo.map((periodo: any) => (
          <li key={periodo.id}>{periodo.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPeriodo;
