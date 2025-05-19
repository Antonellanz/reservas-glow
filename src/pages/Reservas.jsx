import { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL } from '../config';
import './Reservas.css';

const Reservas = () => {
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [categoria, setCategoria] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
   useEffect(() => {
    if (!token) {
      localStorage.setItem('mensajeLogin', '⚠️ Debés iniciar sesión para reservar un turno.');
      navigate('/login');
    }
  }, [token, navigate]);
  const horasDisponibles = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

  const handleReserva = async () => {
    if (!fecha || !hora) {
      setMensaje("❗ Por favor seleccioná una fecha y una hora.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/reservas`, {
        fecha: fecha.toISOString().split('T')[0],
        hora: hora + ":00",
        categoria: categoria
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMensaje("✅ ¡Turno reservado con éxito!");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al reservar. Puede que ya esté ocupado.");
    }
  };

  return (
    <div className="reserva-container">
      <h2 className="titulo">Reservá tu turno</h2>

      <div className="campo">
        <label>Seleccioná una fecha:</label>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          placeholderText="Elegí un día"
          className="input-datepicker"
        />
      </div>

      <div className="campo">
        <label>Seleccioná una hora:</label>
        <select value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">-- Hora --</option>
          {horasDisponibles.map((horaOp) => (
            <option key={horaOp} value={horaOp}>{horaOp}</option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label>Seleccioná una categoría:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">-- Categoría --</option>
          <option value="Peluquería">Peluquería</option>
          <option value="Maquillaje">Maquillaje</option>
          <option value="Spa">Spa</option>
          <option value="Uñas">Uñas</option>
          <option value="Masajes">Masajes</option>
        </select>
      </div>

      <button className="btn-reservar" onClick={handleReserva}>Reservar</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <button className="btn-volver" onClick={() => navigate("/perfil")}>
        Volver a mi perfil
      </button>
    </div>
  );
};

export default Reservas;
