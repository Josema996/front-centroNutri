// Ingreso.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Ingreso/Ingreso.css';
import fondo from '../images/fondo.mp4';

const Ingreso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [esMedico, setEsMedico] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');

  useEffect(() => {
    // Verifica la información del tipo de usuario en la ubicación
    if (location.state && location.state.esMedico) {
      // Usuario seleccionado como médico
      setEsMedico(true);
    } else {
      // Usuario seleccionado como paciente
      setEsMedico(false);
    }
  }, [location.state]);

  const volverAInicio = () => {
    navigate('/');
  };

  const realizarIngreso = async () => {
    try {
      // Verificar si hay un registro existente para el paciente
      const pacienteResponse = await fetch(`http://localhost:8000/ingresos/verificar?dni=${dni}&contrasena=${password}&tipo=paciente`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!pacienteResponse.ok) {
        console.error(`Error al verificar el registro del paciente: ${pacienteResponse.status}`);
        const errorData = await pacienteResponse.json();
        console.error('Detalles del error:', errorData);
        throw new Error(`Error al verificar el registro del paciente: ${pacienteResponse.status}`);
      }
  
      const pacienteExistente = await pacienteResponse.json();
  
      // Verificar si hay un registro existente para el médico
      const medicoResponse = await fetch(`http://localhost:8000/ingresos/verificar?dni=${dni}&contrasena=${password}&tipo=medico`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!medicoResponse.ok) {
        console.error(`Error al verificar el registro del médico: ${medicoResponse.status}`);
        const errorData = await medicoResponse.json();
        console.error('Detalles del error:', errorData);
        throw new Error(`Error al verificar el registro del médico: ${medicoResponse.status}`);
      }
  
      const medicoExistente = await medicoResponse.json();
  
      if (pacienteExistente && !medicoExistente && !esMedico) {
        // Si hay un registro existente para el paciente y no para el médico, y el usuario intenta ingresar como paciente, redirige a landingpaciente
        navigate('/landingpaciente');
      } else if (medicoExistente && !pacienteExistente && esMedico) {
        // Si hay un registro existente para el médico y no para el paciente, y el usuario intenta ingresar como médico, redirige a landingmedico
        navigate('/landingmedico');
      } else {
        // Si no hay un registro existente o hay un conflicto en las opciones, muestra un mensaje de error o realiza alguna acción
        setErrorMensaje('Error: Registro no encontrado');
        setTimeout(() => setErrorMensaje(''), 900);
        // Puedes mostrar un mensaje al usuario o realizar otras acciones según tus necesidades
      }
    } catch (error) {
      console.error('Error al realizar el ingreso:', error);
      // Puedes mostrar un mensaje de error al usuario
    }
  };
  
  

  const redirigirARegistro = () => {
    navigate('/registro');
  };

  // Condición para renderizar el botón de "Registrarse"
  const renderizarBotonRegistro = !esMedico && (
    <button className="boton-registrarse" onClick={redirigirARegistro}>
      Registrarse
    </button>
  );

  return (
    <div className="fondo-comun-container">
      <video autoPlay muted loop className="fondo-comun-background">
        <source src={fondo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      <div className="cuadro-flotante-ingreso">
        <h2>Bienvenido</h2>
        <p>Ingresa tu DNI y contraseña:</p>
        <div className="formulario">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="opciones">
          <button className="boton-atras" onClick={realizarIngreso}>
            Ingresar
          </button>
          <button className="boton-atras" onClick={volverAInicio}>
            Volver Atrás
          </button>
          {renderizarBotonRegistro}
        </div>
        {errorMensaje && <div className="error-message">{errorMensaje}</div>}
      </div>
    </div>
  );
};

export default Ingreso;
