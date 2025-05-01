import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/reservas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservas(response.data);
      } catch (error) {
        console.error('❌ Error al obtener las reservas:', error);
      }
    };

    if (token) fetchReservas();

    
  }, [token]);

  const eliminarReserva = async (id) => {
    const confirmar = window.confirm(`¿Estás segura de eliminar la reserva #${id}?`);
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/reservas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas((prev) => prev.filter((reserva) => reserva.id !== id));
    } catch (error) {
      console.error('❌ Error al eliminar la reserva:', error);
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const reservasFiltradas = reservas.filter((reserva) =>
    reserva.usuario.name?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <button className="cerrar-btn" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar por nombre de usuario"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filtro-input"
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.usuario.name}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.servicio?.categoria || "Sin categoría"}</td>
                <td>
                  <button className="eliminar-btn" onClick={() => eliminarReserva(reserva.id)}>
                     Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay reservas encontradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
