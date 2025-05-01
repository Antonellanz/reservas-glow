import React from 'react';
import { Link } from "react-router-dom";

import './Home.css';

const servicios = [
  { nombre: 'Peluquería', imagen: '/peluqueria.jpg.jpeg', ruta: 'peluqueria' },
  { nombre: 'Masajes', imagen: '/masaje.jpg.jpeg', ruta: 'masajes' },
  { nombre: 'Limpieza Facial', imagen: '/limpieza.jpg.jpeg', ruta: 'limpieza-facial' },
  { nombre: 'Uñas', imagen: '/uñas.jpg.jpeg', ruta: 'uñas' },
  { nombre: 'Maquillaje', imagen: '/maquillaje.jpg.jpeg', ruta: 'maquillaje' },
  { nombre: 'Spa', imagen: '/spa.jpg.jpeg', ruta: 'spa' }
];

const Home = () => {
  
  return (
    <div className="home-container">
      <div className="hero-section">
       <div className="hero-text">
          <h1>Bienvenida a <span className="glow">GLOW</span></h1>
        
          <p>Descubrí tu mejor versión con nuestros servicios de belleza.</p>
        </div>
        </div>

      <div className="service-section">
        {servicios.map((servicio, index) => (
          <div key={index} className="card">
           <Link to={`/servicios/${servicio.ruta}`} key={servicio.nombre} className="card">
            <img src={servicio.imagen} alt={servicio.nombre} />
            <h3>{servicio.nombre}</h3>
            </Link>
          </div>
        ))}
      </div>
    
    <div className="info-section">
    <h2>¿Por qué elegir GLOW?</h2>
    <div className="info-items">
      <div className="info-card">
        <i className="fas fa-star"></i>
        <h4>Calidad Premium</h4>
        <p>Productos y servicios de alta gama pensados para vos.</p>
      </div>
      <div className="info-card">
        <i className="fas fa-user-friends"></i>
        <h4>Atención Personalizada</h4>
        <p>Te acompañamos en cada paso para que te sientas única.</p>
      </div>
      <div className="info-card">
        <i className="fas fa-spa"></i>
        <h4>Ambiente Relajante</h4>
        <p>Un espacio diseñado para tu bienestar y tranquilidad.</p>
      </div>
    </div>
  </div>
  </div>
  
  );


};

export default Home;
