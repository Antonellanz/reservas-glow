import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Reservas from './pages/Reservas';
import Footer from './components/Footer';
import Header from './components/Header';
import HistorialReservas from './components/HistorialReservas';
import AdminPanel from './pages/AdminPanel';

import ServicioDetalle from "./pages/ServicioDetalle";
import { UserProvider } from './context/UserProvider';
 

import './App.css'; 

function App() {
 
  return (
    <UserProvider> 
    <div className="app-container">
    
      <Header /> 

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/historial" element={<HistorialReservas />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/servicios/:ruta" element={<ServicioDetalle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </main>

      <Footer /> 
    </div>
    </UserProvider>
  );
}

export default App;



