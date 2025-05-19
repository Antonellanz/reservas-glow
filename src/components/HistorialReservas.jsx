import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { API_URL } from '../config';
import './HistorialReservas.css';  

const HistorialReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reservas/mis-reservas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservas(response.data);
      } catch (error) {
        console.error(error);
        setMensaje('❌ Error al obtener las reservas.');
      }
    };

    obtenerReservas();
  }, [token]);

  const confirmarCancelar = (reserva) => {
    setReservaSeleccionada(reserva);
    setMostrarModal(true);
  };

  const cancelarReserva = async () => {
    if (!reservaSeleccionada) return;

    try {
      await axios.delete(`${API_URL}/api/auth/reservas/${reservaSeleccionada.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas(reservas.filter((r) => r.id !== reservaSeleccionada.id));
      setMensaje('✅ Reserva cancelada con éxito.');
    } catch (error) {
      console.error('Error al cancelar reserva', error);
      setMensaje('❌ No se pudo cancelar la reserva.');
    } finally {
      setMostrarModal(false);
      setReservaSeleccionada(null);
    }
  };

  const columnas = [
    {
      name: 'Fecha',
      selector: row => row.fecha,
      sortable: true,
    },
    {
      name: 'Hora',
      selector: row => row.hora,
      sortable: true,
    },
    {
      name: 'Categoría',
      selector: row => row.categoria,
      sortable: true,
    },
    {
      
        name: 'Acciones',
        cell: row => (
          <div style={{ overflow: 'visible' }}>
            <button
              onClick={() => confirmarCancelar(row)}
              className="btn-cancelar"
            >
              Cancelar
            </button>
          </div>
        ),
        ignoreRowClick: true,
        wrap: true,
    },
  ];

  return (
    <div className="historial-container">
      {mensaje && <p>{mensaje}</p>}
      <DataTable
        columns={columnas}
        data={reservas}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="Aún no tenés reservas."
      />

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Estás segura de que querés cancelar esta reserva?</p>
            <div className="modal-buttons">
              <button onClick={cancelarReserva} className="btn-confirmar">Sí, cancelar</button>
              <button onClick={() => setMostrarModal(false)} className="btn-cancelar-modal">No, volver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialReservas;
