// src/services/nutricionService.ts
import api from './api';

const nutricionService = {
  // Servicios para 'Dias'
  getDias: () => api.get('/nutricion/dias'),
  createDia: (data: any) => api.post('/nutricion/dias', data),
  updateDia: (id: number, data: any) => api.put(`/nutricion/dias/${id}`, data),
  deleteDia: (id: number) => api.delete(`/nutricion/dias/${id}`),

  // Servicios para 'TiposComida'
  getTiposComida: () => api.get('/nutricion/tipos-comida'),
  createTipoComida: (data: any) => api.post('/nutricion/tipos-comida', data),
  updateTipoComida: (id: number, data: any) => api.put(`/nutricion/tipos-comida/${id}`, data),
  deleteTipoComida: (id: number) => api.delete(`/nutricion/tipos-comida/${id}`),

  // Servicios para 'TiposPlato'
  getTiposPlato: () => api.get('/nutricion/tipos-plato'),
  createTipoPlato: (data: any) => api.post('/nutricion/tipos-plato', data),
  updateTipoPlato: (id: number, data: any) => api.put(`/nutricion/tipos-plato/${id}`, data),
  deleteTipoPlato: (id: number) => api.delete(`/nutricion/tipos-plato/${id}`),

  // Servicios para 'TiposPaciente'
  getTiposPaciente: () => api.get('/nutricion/tipos-paciente'),
  createTipoPaciente: (data: any) => api.post('/nutricion/tipos-paciente', data),
  updateTipoPaciente: (id: number, data: any) => api.put(`/nutricion/tipos-paciente/${id}`, data),
  deleteTipoPaciente: (id: number) => api.delete(`/nutricion/tipos-paciente/${id}`),

  // Servicios para 'Personal'
  getPersonal: () => api.get('/nutricion/personal'),
  createPersonal: (data: any) => api.post('/nutricion/personal', data),
  updatePersonal: (id: number, data: any) => api.put(`/nutricion/personal/${id}`, data),
  deletePersonal: (id: number) => api.delete(`/nutricion/personal/${id}`),

  // Servicios para 'Menus'
  getMenus: () => api.get('/nutricion/menus'),
  createMenu: (data: any) => api.post('/nutricion/menus', data),
  updateMenu: (id: number, data: any) => api.put(`/nutricion/menus/${id}`, data),
  deleteMenu: (id: number) => api.delete(`/nutricion/menus/${id}`),

  // Servicios para 'MenusPaciente'
  getMenusPaciente: () => api.get('/nutricion/menus-paciente'),
  createMenuPaciente: (data: any) => api.post('/nutricion/menus-paciente', data),
  updateMenuPaciente: (id: number, data: any) => api.put(`/nutricion/menus-paciente/${id}`, data),
  deleteMenuPaciente: (id: number) => api.delete(`/nutricion/menus-paciente/${id}`),

  // Servicios para 'MenuPeriodo'
  getMenuPeriodo: () => api.get('/nutricion/menu-periodo'),
  createMenuPeriodo: (data: any) => api.post('/nutricion/menu-periodo', data),
  updateMenuPeriodo: (id: number, data: any) => api.put(`/nutricion/menu-periodo/${id}`, data),
  deleteMenuPeriodo: (id: number) => api.delete(`/nutricion/menu-periodo/${id}`),

  // Servicios para 'MenuPeriodoDetalle'
  getMenuPeriodoDetalle: () => api.get('/nutricion/menu-periodo-detalle'),
  createMenuPeriodoDetalle: (data: any) => api.post('/nutricion/menu-periodo-detalle', data),
  updateMenuPeriodoDetalle: (id: number, data: any) => api.put(`/nutricion/menu-periodo-detalle/${id}`, data),
  deleteMenuPeriodoDetalle: (id: number) => api.delete(`/nutricion/menu-periodo-detalle/${id}`),
};

export default nutricionService;
