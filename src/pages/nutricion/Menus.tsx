// src/pages/nutricion/Menus.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menus: React.FC = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/menus')
      .then(response => setMenus(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Menús</h2>
      <ul>
        {menus.map((menu: any) => (
          <li key={menu.id}>{menu.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menus;
