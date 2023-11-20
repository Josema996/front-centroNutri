import React, { useEffect, useState } from 'react';
import { FaPhone, FaMapMarker } from 'react-icons/fa';
import logo from '../images/logoNutri.png';
import '../LandingPage/LandingPage.css';
import '../NavBar/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleReservarTurno = () => {
    navigate('/turnos'); // Redirige al usuario a la página de turnos
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConocenos = () => {
    scrollToSection('conocenos-section');
  };

  const scrollToServicios = () => {
    scrollToSection('servicios-section');
  };
  
  const handlePerfilClick = () => {
    // Add logic to handle profile click (e.g., navigate to the profile page)
    setProfileClicked(true);
  };

  const handleInicioClick = () => {
    window.location.href = '/';
  };

  return (
    <div>
      {/* Barra de navegación superior (verde oscuro) */}
      <div className="navbar-top bg-green text-light" style={{ padding: '10px 0', width: '100%' }}>
        <div className="container-fluid d-flex justify-content-start align-items-center">
          <div className="d-flex align-items-center me-4">
            <FaPhone size={24} /> <span className="ms-2" style={{ fontSize: '18px' }}>Teléfono: 3814761180</span>
          </div>
          <div className="d-flex align-items-center">
            <FaMapMarker size={24} /> <span className="ms-2" style={{ fontSize: '18px' }}>Dirección: Santiago del Estero 157, San Miguel de Tucumán</span>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal (verde claro) */}
      <nav className={`navbar navbar-light ${scrolled ? 'scrolled fixed-top' : ''} navbar-main`} style={{ transition: 'background-color 0.3s' }}>
        <div className="container-fluid">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-text">Lic. Agustina Hernandez</span>
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <span onClick={handleInicioClick} className={`btn btn-outline-primary mx-2 ${scrolled ? 'scrolled-btn' : ''} nav-link`} style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>Inicio</span>
            <span onClick={scrollToServicios} className={`btn btn-outline-primary mx-2 ${scrolled ? 'scrolled-btn' : ''} nav-link`} style={{ backgroundColor: 'transparent', cursor: 'pointer' }}>Servicios</span>
            <span onClick={() => scrollToSection('consultas-section')} className={`btn btn-outline-primary mx-2 ${scrolled ? 'scrolled-btn' : ''} nav-link`} style={{ cursor: 'pointer', backgroundColor: 'transparent' }}>Consultas</span>
            <span onClick={scrollToConocenos} className={`btn btn-outline-primary mx-2 ${scrolled ? 'scrolled-btn' : ''} nav-link`} style={{ cursor: 'pointer', backgroundColor: 'transparent' }}>Conócenos</span>
          </div>
          <div className={`d-flex ${scrolled ? 'fixed-btn-container' : ''}`}>
            <span onClick={handleReservarTurno} className="btn btn-outline-primary mx-2 custom-btn" style={{ color: '#000', backgroundColor: 'transparent', cursor: 'pointer' }}>Reserve su Turno</span>
            <span onClick={() => window.location.href = '/modifTurnos'} className="btn btn-outline-primary mx-2 custom-btn" style={{ color: '#000', backgroundColor: 'transparent', cursor: 'pointer' }}>Modifique su Turno</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;