// Inicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaArrowDown, FaWhatsapp } from 'react-icons/fa';
import './Inicio.css';
import { Link } from 'react-scroll';


import Footer from '../Footer/Footer.js';

import imagen1 from '../images/carrusel1.png';
import imagen2 from '../images/carrusel2.png';
import imagen3 from '../images/carrusel3.png';

import icono1 from '../images/dietas_personalizadas2.png';
import icono2 from '../images/expertos_reconocidos.png';
import icono3 from '../images/profesionales.png';

import logoInicio from '../images/logoInicio.png';
import ImgInicio from '../images/ingreso.jpg';
import nuevaImagen1 from '../images/Post1.jpeg';
import nuevaImagen2 from '../images/Post2.jpeg';
import nuevaImagen3 from '../images/Post3.jpeg';

const Inicio = () => {
  const navigate = useNavigate();
  

  const handleScrollDown = () => {
    const siguienteContenedor = document.getElementById('siguiente-contenedor');

    if (siguienteContenedor) {
      siguienteContenedor.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="page-container">
      <div className="video-container">
        <div className="navbar">
          <img src={logoInicio} alt="Logo" className="logo" />
          <div className="navbar-options">
            <span><a href="/" onClick={handleScrollToTop}>
            Inicio
          </a></span>
            <span><Link to="ingreso-container" smooth={true} duration={400}>
          Ingreso
          </Link></span>
            <span onClick={() => navigate('/reservar-cancelar-turno')}>Reservar/Cancelar Turno</span>
            <span><Link to="comentarios-container" smooth={true} duration={400}>
          Ustedes
           </Link></span>
          </div>
        </div>

        <div className="carrusel-container">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            interval={3000}
            stopOnHover={true}
            swipeable={true}
          >
            <div>
              <img src={imagen1} alt="Imagen 1" />
            </div>
            <div>
              <img src={imagen2} alt="Imagen 2" />
            </div>
            <div>
              <img src={imagen3} alt="Imagen 3" />
            </div>
          </Carousel>
        </div>

        <div className="scroll-down-container" onClick={handleScrollDown}>
          <FaArrowDown className="scroll-down-icon" />
        </div>
      </div>

      <div className="titulo-container">
        <h1>NUTRICIÓN CLINIC</h1>
        <h2>-Dietista-Nutricionista-</h2>
        <p>
          Cada persona es diferente, tiene unos objetivos distintos y unas situaciones personales
          particulares, por lo que sus planes de alimentación deben estar pautados de forma
          personalizada.
        </p>
      </div>

      <div id="siguiente-contenedor" className="siguiente-contenedor">
        <div className="opcion-container">
          <img src={icono2} alt="Icono 1" className="opcion-icon" />
          <div className="opcion-info">
            <h3>Consulta Online</h3>
            <p>Te ofrecemos la posibilidad de realizar la consulta estés donde estés sin necesidad de desplazarte a nuestro centro..</p>
          </div>
        </div>
        <div className="opcion-container">
          <img src={icono1} alt="Icono 2" className="opcion-icon" />
          <div className="opcion-info">
            <h3>Dietas Personalizadas</h3>
            <p>Adaptamos tu alimentación a tus gustos, hábitos y estilo de vida.</p>
          </div>
        </div>
        <div className="opcion-container">
          <img src={icono3} alt="Icono 3" className="opcion-icon" />
          <div className="opcion-info">
            <h3>Dietistas-Nutricionistas Titulados</h3>
            <p>El equipo de Nutrición Clinic está formado por profesionales especializados en diferentes áreas de la nutrición.</p>
          </div>
        </div>
      </div>

      <div name="ingreso-container" className="ingreso-container">
        <div className="imagen-container">
          <img src={ImgInicio} alt="Imagen acoplada" />
        </div>
        <div className="ingreso-opciones">
          <h2 className="titulo-ingreso">¿Cómo deseas ingresar?</h2>
          <button onClick={() => navigate('/ingreso', { state: { esMedico: true } })} className="opcion-ingreso">
          Ingresar como Médico
          </button>
          <button onClick={() => navigate('/ingreso')} className="opcion-ingreso">
            Ingresar como Paciente
          </button>
        </div>
      </div>

      <div name="comentarios-container" className="comentarios-container">
  <h1 className="comentarios-titulo">Comentarios</h1>
  <h2 className="comentarios-subtitulo">- Últimos posts -</h2>
  <div id="nuevo-contenedor" className="nuevo-contenedor">
    <div className="opcion-container">
      <img src={nuevaImagen1} alt="Nueva Imagen 1" className="opcion-icon" />
      <div className="opcion-info">
        
      </div>
    </div>
    <div className="opcion-container">
      <img src={nuevaImagen2} alt="Nueva Imagen 2" className="opcion-icon" />
      <div className="opcion-info">
        
      </div>
    </div>
    <div className="opcion-container">
      <img src={nuevaImagen3} alt="Nueva Imagen 3" className="opcion-icon" />
      <div className="opcion-info">
       
      </div>
    </div>
  </div>
</div>

      {/* Ícono de WhatsApp */}
      <div className="whatsapp-icon-container">
        <a href="https://wa.me/3815762485" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="whatsapp-icon" />
        </a>
        <p>¡Cualquier duda que tengas, consúltanos!</p>
      </div>

      <Footer />
    </div>
  );
};

export default Inicio;
