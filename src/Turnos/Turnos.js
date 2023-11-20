import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../Turnos/Turnos.css'

const StyledTurnosContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SuccessAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #4caf50;
  color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: opacity 0.5s ease; /* Agrega una transición de opacidad para ocultar suavemente */
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Turnos = () => {
  const [turnoData, setTurnoData] = useState({
    FechaDisp: '',
    HorarioDisp: '',
    TipoConsu: '',
    PrecioConsulta: 4000,
    Dni: '',
    NombreCompleto: '',
    Celular: '',
  });

  const [showCreatePatientMessage, setShowCreatePatientMessage] = useState(false);
  const [createPatientAccepted, setCreatePatientAccepted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  

  useEffect(() => {
    // Obtener la lista de médicos al cargar el componente
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/medicos/medicos');
        if (response && response.data) {
          // setMedicos(response.data); // Asegúrate de manejar los médicos según tu lógica
        } else {
          console.error('La respuesta no tiene datos:', response);
        }
      } catch (error) {
        console.error('Error al obtener la lista de médicos:', error.response.data);
      }
    };

    fetchMedicos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTurnoData({ ...turnoData, [name]: value });
  };

  const handleCreateNewPatient = async () => {
    setShowCreatePatientMessage(false);
    setCreatePatientAccepted(true);
  };

  const handleRejectCreateNewPatient = () => {
    setShowCreatePatientMessage(false);
    setCreatePatientAccepted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Si el paciente no está registrado y se aceptó la creación, muestra el mensaje para crear el paciente
      if (!createPatientAccepted) {
        setShowCreatePatientMessage(true);
        return;
      }

      // Realizar la solicitud POST al servidor para crear el turno
      const response = await axios.post('http://localhost:8000/turnos/turnos', turnoData);

      console.log('Turno creado con éxito:', response.data);

      // Actualiza el estado con el IdTurno desde la respuesta del servidor
      setTurnoData({ ...turnoData, IdTurno: response.data.IdTurno }); // Ajusta según la estructura real de tu respuesta

      // Muestra el mensaje de éxito y reinicia el estado después de la creación exitosa
      setShowSuccessMessage(true);
      setCreatePatientAccepted(false);

      // Oculta el mensaje después de 3 segundos (3000 milisegundos)
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // ... (Resto de tu lógica, como redirigir o mostrar mensajes adicionales)
    } catch (error) {
      console.error('Error al crear el turno:', error.response.data);
    }
  };

  return (
    <StyledTurnosContainer style={{marginTop:'20px'}}>
      <h2>Crear Turno</h2>
      
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="FechaDisp">Fecha:</label>
        <input
          type="date"
          id="FechaDisp"
          name="FechaDisp"
          value={turnoData.FechaDisp}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="HorarioDisp">Horario:</label>
        <input
          type="time"
          id="HorarioDisp"
          name="HorarioDisp"
          value={turnoData.HorarioDisp}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="TipoConsu">Tipo de Consulta:</label>
        <input
          type="text"
          id="TipoConsu"
          name="TipoConsu"
          value={turnoData.TipoConsu}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="Dni">DNI:</label>
        <input
          type="text"
          id="Dni"
          name="Dni"
          value={turnoData.Dni}
          onChange={handleInputChange}
          required
        />

        {createPatientAccepted && (
          <div>
            <label htmlFor="NombreCompleto">Nombre Completo:</label>
            <input
              type="text"
              id="NombreCompleto"
              name="NombreCompleto"
              value={turnoData.NombreCompleto}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="Celular">Celular:</label>
            <input
              type="text"
              id="Celular"
              name="Celular"
              value={turnoData.Celular}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit">Crear Turno</button>
        <Link to='/landingpaciente' className='volver-atras-btn'>Volver atrás</Link>
      </StyledForm>
      

      {showCreatePatientMessage && (
        <div>
          <p>El paciente no está registrado. ¿Desea crear un nuevo paciente con el DNI proporcionado?</p>
          <button onClick={handleCreateNewPatient}>Sí, crear nuevo paciente</button>
          <button onClick={handleRejectCreateNewPatient}>No, cancelar</button>
        </div>
      )}
      {showSuccessMessage && (
        <SuccessAlert visible={showSuccessMessage}>
          El turno fue cargado con éxito. Su número de turno es: {turnoData.IdTurno} {/* Ajusta según la estructura real de tu respuesta */}
          </SuccessAlert>
      )}
    </StyledTurnosContainer>
  );
};

export default Turnos;
