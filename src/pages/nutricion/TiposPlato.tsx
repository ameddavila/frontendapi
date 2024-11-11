// src/pages/nutricion/TiposPlato.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TiposPlato: React.FC = () => {
  const [tiposPlato, setTiposPlato] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/tipos-plato')
      .then(response => setTiposPlato(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Tipos de Plato</h2>
      <ul>
        {tiposPlato.map((tipo: any) => (
          <li key={tipo.id}>{tipo.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default TiposPlato;
