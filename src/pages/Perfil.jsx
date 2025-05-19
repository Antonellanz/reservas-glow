import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import HistorialReservas from '../components/HistorialReservas';
import { API_URL } from '../config';
import './Perfil.css';

const Perfil = () => {
  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { usuario, setUsuario } = useContext(UserContext);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('userEmail');
  console.log("EMAIL:", email);
console.log("TOKEN:", token);



  useEffect(() => {
   
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/usuario/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Usuario de front:", response.data);

        
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/reservas/usuario/${email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservas(response.data.name);
      } catch (error) {
        console.error('Error al obtener reservas', error);
        setMensaje('❌ No se pudieron cargar tus reservas.');
      }
    };
    
  console.log("Email desde localStorage:", email);

    if (email && token) {
      obtenerUsuario();
      obtenerReservas();
    }
  }, [email, token]);

  const cancelarReserva = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/auth/reservas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(reservas.filter((r) => r.id !== id));
      setMensaje('✅ Reserva cancelada con éxito.');
    } catch (error) {
      console.error('Error al cancelar reserva', error);
      setMensaje('❌ No se pudo cancelar la reserva.');
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    setUsuario(null);
    navigate('/');
  };

  return (
    <div className="perfil-container">
    <h2 className="perfil-titulo">¡Hola, {usuario}!</h2>

      <p className="perfil-bienvenida">Bienvenida a tu espacio personal</p>

      <div className="perfil-actions">
        <Link to="/reservas" className="btn-accion">➕ Reservar ahora</Link>
        <button onClick={cerrarSesion} className="btn-accion cerrar">🔓 Cerrar sesión</button>
      </div>

      <h3 className="perfil-subtitulo">📋 Tus reservas:</h3>
      <HistorialReservas />

      {mensaje && <div className="perfil-mensaje">{mensaje}</div>}

      {reservas.length > 0 ? (
        <ul className="perfil-lista">
          {reservas.map((reserva) => (
            <li key={reserva.id} className="perfil-card">
              <p><strong>📅 Fecha:</strong> {reserva.fecha}</p>
              <p><strong>⏰ Hora:</strong> {reserva.hora}</p>
              <button onClick={() => cancelarReserva(reserva.id)} className="btn-cancelar">
                Cancelar reserva
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="perfil-vacio">Aún no tenés reservas activas.</p>
      )}
    </div>
  );
};

export default Perfil;


