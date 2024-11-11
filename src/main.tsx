// src/main.tsx
import './types/theme.d.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';  <-- Elimina esta línea si no necesitas el archivo CSS
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
