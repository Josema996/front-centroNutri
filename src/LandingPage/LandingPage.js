import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faEdit, faPaperPlane, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import image from '../images/foto.jpeg';
import image2 from '../images/Conocenos.jpg';
import '../LandingPage/LandingPage.css';
import NavBar from '../NavBar/NavBar.js';
import Footer from '../Footer/Footer.js';
import MapContainer from '../Maps/GoogleMaps.js';
import ReCAPTCHA from "react-google-recaptcha";


const LandingPage = () => {
  const consultasSectionRef = useRef(null);
  const conocenosSectionRef = useRef(null);
  const serviciosSectionRef = useRef(null);

  const [captchaValido, cambiarCaptchaValido] = useState(null);
  const [mostrarMensajeCaptcha, cambiarMostrarMensajeCaptcha] = useState(false);
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [message, setMessage] = useState({
    type: '', // 'success' o 'error'
    text: '',
  });

  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      cambiarCaptchaValido(true);
    } else {
      cambiarCaptchaValido(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuccessMessage = () => {
    setTimeout(() => {
      setMessage({
        type: '',
        text: '',
      });
      captcha.current.reset();
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit clicked');
    // Validar si todos los campos están llenos
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message ||
      !captchaValido ||
      !captcha.current.getValue()
    ) {
      // Mostrar alerta de completar todos los campos
      alert('Por favor, completa todos los campos, incluido el reCAPTCHA.');
      return;
    }
  
    try {
      const token = await window.grecaptcha.enterprise.execute('6LeQNgspAAAAACn_S2Mw1r7LeVAH3_6F8tS1_g0K', { action: 'submit' });
  
      const response = await fetch('http://localhost:8000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, token }),
      });
  
      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Consulta enviada exitosamente',
        });
  
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
  
        handleSuccessMessage();
      } else {
        setMessage({
          type: 'error',
          text: 'Error al enviar el correo electrónico',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error de red',
      });
      console.error('Error de red:', error);
    }
  };

  const handleDownload = () => {
    const imagePath = '/cv.jpeg';
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = 'Curriculum_Vitae.jpeg';
    link.click();
  };

  const scrollToConocenos = () => {
    conocenosSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <NavBar />
      <div className='container mt-5' id="servicios-section" ref={serviciosSectionRef}>
        <div className='row justify-content-center id="servicios-section"'>
          <div className='col-md-6'>
            <img src={image} alt='Descripción de la imagen' className='img-fluid' />
          </div>
          <div className='col-md-6 text-center'>
            <h2 className='mb-4'>Servicios</h2>
            <p className='nutritional-center-text'>
              Nuestro Centro Nutricional ofrece una variedad de servicios diseñados para mejorar tu salud y bienestar a través de una alimentación balanceada y personalizada. Algunos de nuestros servicios incluyen:
              
              <ul className="list-unstyled">
                <li>- Evaluación Nutricional Personalizada</li>
                <li>- Planes de Dieta Personalizados</li>
                <li>- Asesoramiento en Nutrición Deportiva</li>
                <li>- Control de Peso y Metabolismo</li>
                <li>- Educación Nutricional</li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      <div className='container mt-3 mb-5' ref={consultasSectionRef} id="consultas-section">
        <div className='row justify-content-start'>
          <div className='col-md-6'>
            <div className='contact-form'>
              <h3 className='mb-4'>Consulta</h3>
              {message.type && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                  <FontAwesomeIcon icon={faUser} className='form-icon' />
                  <input type='text' name='name' placeholder='Nombre' value={formData.name} onChange={handleInputChange} className='form-input large-input' required />
                </div>
                <div className='mb-2'>
                  <FontAwesomeIcon icon={faEnvelope} className='form-icon' />
                  <input type='email' name='email' placeholder='Correo Electrónico' value={formData.email} onChange={handleInputChange} className='form-input large-input' required />
                </div>
                <div className='mb-2'>
                  <FontAwesomeIcon icon={faEdit} className='form-icon' />
                  <select name='subject' value={formData.subject} onChange={handleInputChange} className='form-input' required>
                    <option value='' disabled hidden>Selecciona un Asunto</option>
                    <option value='Problemas Alimenticios'>Problemas Alimenticios</option>
                    <option value='Problema con turnos'>Problema con turnos</option>
                    <option value='Consulta ubicacion'>Consulta ubicación</option>
                  </select>
                </div>
                <div className='mb-2'>
                  <textarea name='message' placeholder='Mensaje' value={formData.message} onChange={handleInputChange} className='form-input large-input' required />
                </div>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LfxNwspAAAAABIuuzAWEszaERg3VZCIQEV6upro"
                  onChange={onChange}
                  style={{ marginLeft: '150px' }}
                />
              
                <div className="mt-2">
                  {mostrarMensajeCaptcha && (
                    <div className="alert alert-danger" role="alert">
                      Por favor, complete el reCAPTCHA antes de enviar la consulta.
                    </div>
                  )}
                </div>
                <button type='submit' className='btn-submit'>
  <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
  Enviar Consulta
</button>
              </form>
            </div>
          </div>
          <div className='col-md-6'>
            <MapContainer />
          </div>
        </div>
      </div>

      <div className='container mt-5 container-third' ref={conocenosSectionRef} id="conocenos-section">
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <img src={image2} alt='Descripción de la imagen' className='img-fluid smaller-image' />
          </div>
          <div className='col-md-6 text-center-third'>
            <h2 className='mb-4 text-center'>Conócenos</h2>
            <p className='nutritional-center-text nutritional-center-text-third'>
              ¡Bienvenido al Centro Nutricional! Ofrecemos servicios especializados para mejorar tu salud y bienestar a través de una alimentación balanceada y personalizada.
            </p>
            <p className='conoceme-text'>
              Conócenos mejor:
            </p>
            <div className='button-group'>
              <button className='btn-download btn-download-third' onClick={handleDownload}>
                <FontAwesomeIcon icon={faDownload} className='btn-icon' />
                Descargar CV
              </button>
            </div>
            <button className='btn-view-offices' onClick={scrollToConocenos}>
              <FontAwesomeIcon icon={faEye} className='btn-icon' />
              Ver Oficinas
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;