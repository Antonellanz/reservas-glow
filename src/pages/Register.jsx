import { useState } from "react";
import axios from "axios";
import { API_URL } from './config';
import "./AuthForm.css"

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      setMensaje("✨ Usuario registrado correctamente");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data || "Ocurrió un error al registrar";
      setMensaje(msg);
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-form">
    <form onSubmit={handleSubmit}>
      <h2>Crear cuenta</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrarse</button>
      <p>{mensaje}</p>
    </form>
    </div>
    </div>
  );
}


