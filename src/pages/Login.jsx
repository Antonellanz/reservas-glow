import { useNavigate } from "react-router-dom";

import { useState , useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { API_URL } from './config';
import "./AuthForm.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const { setUsuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState('');

useEffect(() => {
  const mensaje = localStorage.getItem('mensajeLogin');
  if (mensaje) {
    setMensajeAdvertencia(mensaje);
    localStorage.removeItem('mensajeLogin'); 
  }
}, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("role", response.data.role);

      
      setUsuario(response.data.name);

      setMensaje("¡Bienvenida " + response.data.name + "!");
      navigate("/perfil");
      
      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }

    } catch (error) {
      console.log(error);
      setMensaje("Credenciales inválidas");
    }
  };

  return (
    
    <div className="auth-container">
      {mensajeAdvertencia && (
  <p className="mensaje-advertencia">{mensajeAdvertencia}</p>
)}

    <div className="auth-form">
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Iniciar sesión</button>
      <p>{mensaje}</p>
    </form>
    </div>
    </div>
  );
}



