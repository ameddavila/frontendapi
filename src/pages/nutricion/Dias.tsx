// src/pages/nutricion/Dias.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dias: React.FC = () => {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/dias')
      .then(response => setDias(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Días de la Semana</h2>
      <ul>
        {dias.map((dia: any) => (
          <li key={dia.id}>{dia.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dias;
