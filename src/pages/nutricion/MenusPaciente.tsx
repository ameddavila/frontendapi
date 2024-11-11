// src/pages/nutricion/MenusPaciente.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenusPaciente: React.FC = () => {
  const [menusPaciente, setMenusPaciente] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/menus-paciente')
      .then(response => setMenusPaciente(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Menús para Pacientes</h2>
      <ul>
        {menusPaciente.map((menu: any) => (
          <li key={menu.id}>{menu.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenusPaciente;
