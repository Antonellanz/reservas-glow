import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'
import "./ServicioDetalle.css";
const serviciosData = {
    peluqueria: {
      nombre: "Peluquería",
      descripcion:
        "Cortes de cabello, peinados y tratamientos para que tu melena luzca siempre fabulosa.",
      imagenes: ["/peluqueria1.jpg.jpeg",
        "/peluqueria2.jpg.jpeg",
        "/peluqueria3.jpg.jpeg",
        "/peluqueria4.jpg.jpeg"

      ]
    },
    masajes: {
      nombre: "Masajes",
      descripcion:
        "Relajación profunda con masajes terapéuticos y de bienestar.",
      imagenes: ["/masaje0.jpg.jpeg",
        "/masaje1.jpg.jpeg",
        "/masaje2.jpg.jpeg"
      ]
    },
    "limpieza-facial": {
      nombre: "Limpieza Facial",
      descripcion:
        "Ritual completo de limpieza y exfoliación para un rostro radiante.",
      imagenes: ["/limpieza1.jpg.jpeg",
        "/limpiaza2.jpg.jpeg",
        "/limpirza3.jpg.jpeg",
        "/limpieza4.jpg.jpeg"
      ]
    },
    uñas: {
      nombre: "Uñas",
      descripcion:
        "Manicuras, pedicuras y decoraciones para unas uñas de ensueño.",
      imagenes:[ "/uñas1.jpg.jpeg",
        "/uñas2.jpg.jpeg",
        "/uñas3.jpg.jpeg"
    ]
    },
    maquillaje: {
      nombre: "Maquillaje",
      descripcion:
        "Looks para eventos, novias o tu día a día con acabados profesionales.",
      imagenes:[ "/maquillaje1.jpg.jpeg",
        "/maquillaje2.jpg.jpeg",
        "/maquillaje3.jpg.jpeg"
      ]
    },
    spa: {
      nombre: "Spa",
      descripcion:
        "Circuitos de relajación, sauna y tratamientos premium para mimarte.",
      imagenes: ["/spa1.jpg.jpeg",
        "/spa2.jpg.jpeg",
        "/spa3.jpg.jpeg"
      ]
    },
  };
  
  export default function ServicioDetalle() {
    const [mostrarModal, setMostrarModal] = useState(false);

    const { ruta } = useParams();
    const servicio = serviciosData[ruta];
  
    if (!servicio) {
      return (
        <div className="servicio-container">
          <h2>Servicio no encontrado</h2>
          <Link to="/">← Volver al inicio</Link>
        </div>
      );
    }
  
    return (
      <div className="servicio-container">
        <div className="servicio-card">
          <h2>{servicio.nombre}</h2>
          <p>{servicio.descripcion}</p>
  
          <Swiper
  pagination={{ clickable: true }}
  modules={[Pagination]}
  spaceBetween={20}
  slidesPerView={1}
  className="galeria-carrusel"
>
  {servicio.imagenes.map((img, i) => (
    <SwiperSlide key={i}>
      <img src={img} alt={`${servicio.nombre} ${i + 1}`} />
    </SwiperSlide>
  ))}
</Swiper>

  
<button className="reservar-btn" onClick={() => setMostrarModal(true)}>
  Reservar ahora
</button>
{mostrarModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>¿Estás lista para reservar?</h3>
      <p>Confirmá para continuar al formulario de reserva.</p>
      <div className="modal-buttons">
        <Link to="/reservas" className="btn-confirmar">Sí, quiero </Link>
        <button onClick={() => setMostrarModal(false)} className="btn-cancelar">Cancelar</button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    );
  }
  