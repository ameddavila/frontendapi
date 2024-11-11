// src/pages/nutricion/TiposComida.tsx
import React, { useEffect, useState } from 'react';
import nutricionService from '../../services/nutricionService';

const TiposComida: React.FC = () => {
  const [tiposComida, setTiposComida] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    nutricionService.getTiposComida()
      .then(response => {
        console.log("Respuesta de tipos de comida:", response.data);  // Verifica los datos aquí
        setTiposComida(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Error al obtener los tipos de comida');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (tiposComida.length === 0 && !error) {
    return <div>Cargando tipos de comida...</div>;  // Mensaje de carga
  }

  return (
    <div>
      <h2>Tipos de Comida</h2>
      <ul>
        {tiposComida.map((tipo: any) => (
          <li key={tipo.TipoComidaID}>{tipo.Nombre}</li>  
        ))}
      </ul>
    </div>
  );
};

export default TiposComida;
