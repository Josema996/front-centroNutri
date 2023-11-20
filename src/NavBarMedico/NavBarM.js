import React from 'react';
import '../NavBarMedico/NavBarM.css';
import logo from '../images/logoMedico.png';

const NavBarM = () => {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav className="navbar-medico">
        <div className="logo-container">
          <img src={logo} alt="Logo Medico" className="logo" />
        </div>
        <ul className="nav-list">
          <li>
            <a href="/landingmedico" onClick={() => scrollToElement('landing-container')} style={{ fontSize: '15px' }}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#pacientes" onClick={() => scrollToElement('lista-pacientes')} style={{ fontSize: '15px' }}>
              Ver Pacientes
            </a>
          </li>
          <li>
            <a href="#perfil" onClick={() => scrollToElement('perfil-medico')} style={{ fontSize: '15px' }}>
              Perfil
            </a>
          </li>
          <li>
            <a href="#dashboard" onClick={() => scrollToElement('dashboard')} style={{ fontSize: '15px' }}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#turnos" onClick={() => scrollToElement('turnos-container')} style={{ fontSize: '15px' }}>
              Turnos
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarM;
