// Registro.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondo from '../images/fondo.mp4';
import '../Resgistro/Registro.css'; // Asegúrate de tener un archivo de estilos para Registro

const Registro = () => {
  const navigate = useNavigate();
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [dni, setDni] = useState('');
  const [registrando, setRegistrando] = useState(false);

  const realizarRegistro = async () => {
    try {
      setRegistrando(true);
  
      // Paso 1: Registro en pacientes
      const pacienteResponse = await fetch('http://localhost:8000/pacientes/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NombreCompleto: nombreCompleto,
          DNI: dni,
          Correo: correoElectronico,
          Contrasena: contrasena,
        }),
      });
      const paciente = await pacienteResponse.json();
  
      // Paso 2: Registro en perfiles
      const perfilResponse = await fetch('http://localhost:8000/perfiles/perfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NombreApellido: nombreCompleto,
          Direccion: '', // Ajusta según tus necesidades
          Dni: dni,
          Contraseña: contrasena,
          Id: paciente.Id, // Asegúrate de usar el nombre correcto de la clave primaria de Pacientes
        }),
      });
      const perfil = await perfilResponse.json();
  
      // Paso 3: Registro en ingresos
      const ingresoResponse = await fetch('http://localhost:8000/ingresos/ingresos', {
    method: 'POST',
      headers: {
    'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        IdMedico: perfil.IdMedico,
        Id: paciente.Id,
        Dni: dni,
        Contraseña: contrasena,
        // Puedes agregar más campos según sea necesario
      }),
});

if (!ingresoResponse.ok) {
  console.error(`Error al crear ingreso: ${ingresoResponse.status}`);
  const errorData = await ingresoResponse.json(); // Puedes imprimir el objeto de error detallado
  console.error('Detalles del error:', errorData);
  throw new Error(`Error al crear ingreso: ${ingresoResponse.status}`);
}
  
      const ingreso = await ingresoResponse.json();
  
      navigate('/landingpaciente');
    } catch (error) {
      console.error('Error al realizar el registro:', error);
      // Manejo de errores aquí, puedes mostrar un mensaje al usuario
    } finally {
      setRegistrando(false);
    }
};
  

  const volverAInicio = () => {
    navigate('/');
  };

  return (
    <div className="fondo-comun-container">
      {/* Video de fondo */}
      <video autoPlay muted loop className="fondo-comun-background">
        <source src={fondo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Cuadro de registro */}
      <div className="cuadro-flotante-registro">
        <h2>Registro</h2>
        <div className="formulario-registro">
          <label htmlFor="nombreCompleto" className="label-registro">
            Nombre Completo:
          </label>
          <input
            type="text"
            id="nombreCompleto"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            className="input-registro"
          />

          <label htmlFor="correoElectronico" className="label-registro">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="correoElectronico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            className="input-registro"
          />

          <label htmlFor="contrasena" className="label-registro">
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="input-registro"
          />

          <label htmlFor="dni" className="label-registro">
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="input-registro"
          />
        </div>

        <div className="opciones-registro">
          <button
            className="boton-registrarse-registro"
            onClick={realizarRegistro}
            disabled={registrando}
          >
            {registrando ? 'Registrando...' : 'Registrarse'}
          </button>
          <button className="boton-atras-registro" onClick={volverAInicio}>
            Volver Atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;
