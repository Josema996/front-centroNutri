import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';
import '../Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer-container">
      <div className="container-fluid">
        <div className="row">
          {/* Columna 1: Informacion de contacto */}
          <div className="col-md-4">
            <h5 className="footer-heading">Información de Contacto</h5>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone /> <span className="footer-text"> 3814761180</span>
              </div>
              <div className="contact-item">
                <FaMapMarker /> <span className="footer-text">Santiago del Estero 157, San Miguel de Tucuman</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Redes sociales */}
          <div className="col-md-4">
            <h5 className="footer-heading">Redes Sociales</h5>
            <div className="social-icons">
              <a href="https://www.instagram.com/agustinaher.nutricion/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/3814761180" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="mailto:contacto@tudominio.com"><FaEnvelope /></a>
            </div>
          </div>

          {/* Columna 3: Horario de atencion */}
          <div className="col-md-4">
  <h5 className="footer-heading">Horario de Atención Presencial</h5>
  <p className="footer-text">Miercoles, Jueves y Viernes: 9:00 AM - 6:00 PM</p>
  <p className="footer-text">Lunes, Martes, Sábado y Domingo: Cerrado</p>

  {/* Agregar espacio o línea adicional */}
  <div className="separator"></div>

  {/* Ajustar margen superior para mover el bloque hacia abajo */}
  <div className="online-hours">
    <h5 className="footer-heading">Horario de Atención Online</h5>
    <p className="footer-text">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
    <p className="footer-text">Sábado y Domingo: Cerrado</p>
  </div>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;