// src/pages/nutricion/Personal.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Personal: React.FC = () => {
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    axios.get('/api/nutricion/personal')
      .then(response => setPersonal(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Personal</h2>
      <ul>
        {personal.map((persona: any) => (
          <li key={persona.id}>{persona.nombre} - {persona.rol}</li>
        ))}
      </ul>
    </div>
  );
};

export default Personal;
