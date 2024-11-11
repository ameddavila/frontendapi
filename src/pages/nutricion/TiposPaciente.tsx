// src/pages/nutricion/TiposPaciente.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TiposPaciente: React.FC = () => {
  const [tiposPaciente, setTiposPaciente] = useState([]);

  useEffect(() => {
    axios.get('/nutricion/tipos-paciente')
      .then(response => setTiposPaciente(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Tipos de Paciente</h2>
      <ul>
        {tiposPaciente.map((tipo: any) => (
          <li key={tipo.id}>{tipo.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default TiposPaciente;
