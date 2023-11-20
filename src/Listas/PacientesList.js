// PacientesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faIdCard,
  faRulerVertical,
  faWeightHanging,
  faFileMedical,
  faCapsules,
  faUtensils,
  faComment,
  faSmoking,
  faRunning,
  faWineGlassAlt,
  faAllergies,
} from '@fortawesome/free-solid-svg-icons';
import './PacientesList.css';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [expandedPacienteId, setExpandedPacienteId] = useState(null);
  const [expandedPaciente, setExpandedPaciente] = useState(null);
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);
  const [errorEliminar, setErrorEliminar] = useState(null);
  const [editingPaciente, setEditingPaciente] = useState(null);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pacientes/pacientes/');
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = response.data;
      console.log('Data received:', data);
      setPacientes(data);
    } catch (error) {
      console.error('Error fetching pacientes:', error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleCall = (telefono) => {
    console.log('Llamando a', telefono);
  };

  const handleEmail = (correo) => {
    console.log('Enviando correo a', correo);
  };

  const handleVerInfo = (pacienteId) => {
    const paciente = pacientes.find((p) => p.Id === pacienteId);
    setExpandedPaciente(paciente);
    setExpandedPacienteId((prevId) => (prevId === pacienteId ? null : pacienteId));
  };

  const handleEliminar = async (pacienteId) => {
    try {
      // Eliminar registros en la tabla Ingresos que hacen referencia al paciente
      await axios.delete(`http://localhost:8000/ingresos/ingresos/${pacienteId}`);
    
      // Luego, eliminar el paciente
      const responsePaciente = await axios.delete(`http://localhost:8000/pacientes/pacientes/${pacienteId}`);
    
      if (responsePaciente.status !== 200) {
        throw new Error(`HTTP error! Status: ${responsePaciente.status}`);
      }
    
      console.log('Paciente eliminado con éxito:', pacienteId);
      // Actualizar la lista de pacientes después de la eliminación
      fetchPacientes();
      // Resetear el estado de confirmación y errores
      setConfirmacionEliminar(null);
      setErrorEliminar(null);
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
      setErrorEliminar('Error al eliminar el paciente. Por favor, inténtelo de nuevo.');
    }
  };
  
  const handleConfirmarEliminar = (pacienteId) => {
    // Mostrar la confirmación antes de eliminar
    setConfirmacionEliminar(pacienteId);
  };

  const handleCancelarEliminar = () => {
    // Cancelar la acción de eliminar
    setConfirmacionEliminar(null);
  };

  const handleEditar = (pacienteId) => {
    const paciente = pacientes.find((p) => p.Id === pacienteId);
    setEditingPaciente({ ...paciente });
  };

  const handleGuardarCambios = async () => {
    try {
      await axios.put(`http://localhost:8000/pacientes/pacientes/${editingPaciente.Id}`, editingPaciente);
      console.log('Cambios guardados con éxito:', editingPaciente.Id);
      // Actualizar la lista de pacientes después de la edición
      fetchPacientes();
      // Limpiar el estado de edición
      setEditingPaciente(null);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  const expandedAttributes = expandedPaciente && (
    <div className="info-expanded">
      <div className="attribute">
        <FontAwesomeIcon icon={faIdCard} className="attribute-icon" />
        <p>DNI: {expandedPaciente.DNI}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faRulerVertical} className="attribute-icon" />
        <p>Altura: {expandedPaciente.Altura}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faWeightHanging} className="attribute-icon" />
        <p>Peso: {expandedPaciente.PesoAct}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faFileMedical} className="attribute-icon" />
        <p>Análisis Médico: {expandedPaciente.AnalisisMedico}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faCapsules} className="attribute-icon" />
        <p>Medicación: {expandedPaciente.Medicacion}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faUtensils} className="attribute-icon" />
        <p>Alimentación: {expandedPaciente.Alimentacion}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faComment} className="attribute-icon" />
        <p>Comentarios: {expandedPaciente.Comentarios}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faSmoking} className="attribute-icon" />
        <p>Fumar: {expandedPaciente.Fumar ? 'Sí' : 'No'}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faRunning} className="attribute-icon" />
        <p>Actividad Física: {expandedPaciente.ActividadFisica ? 'Sí' : 'No'}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faWineGlassAlt} className="attribute-icon" />
        <p>Alcohol: {expandedPaciente.Alcohol}</p>
      </div>
      <div className="attribute">
        <FontAwesomeIcon icon={faAllergies} className="attribute-icon" />
        <p>Alergias: {expandedPaciente.Alergias}</p>
      </div>
    </div>
  );

  return (
    <div className="pacientes-list-container">
      <h2>Lista de Pacientes</h2>
      {errorEliminar && (
        <div className="error-message">
          <p>{errorEliminar}</p>
        </div>
      )}
      <div className="pacientes-container">
        {pacientes.map((paciente) => (
          <div
            key={paciente.Id}
            className={`paciente-card ${expandedPacienteId === paciente.Id ? 'expanded' : ''}`}
          >
            <h3>{paciente.NombreCompleto}</h3>
            <p>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="icon"
                style={{ marginRight: '8px' }}
                onClick={() => handleEmail(paciente.Correo)}
              />
              Email: {paciente.Correo}
            </p>
            <p>
              <FontAwesomeIcon
                icon={faPhone}
                className="icon"
                style={{ marginRight: '8px' }}
                onClick={() => handleCall(paciente.Celular)}
              />
              Teléfono: {paciente.Celular}
            </p>
            <button
              className="ver-info-button common-button"
              onClick={() => handleVerInfo(paciente.Id)}
            >
              Info Paciente
            </button>
            {editingPaciente?.Id === paciente.Id ? (
              <div className="editar-form">
                {/* Formulario de edición con campos modificables */}
                <input
                  type="text"
                  value={editingPaciente.NombreCompleto}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, NombreCompleto: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.DNI}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, DNI: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Altura}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Altura: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.PesoAct}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, PesoAct: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.AnalisisMedico}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, AnalisisMedico: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Celular}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Celular: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Correo}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Correo: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Medicacion}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Medicacion: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Alimentacion}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Alimentacion: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPaciente.Comentarios}
                  onChange={(e) => setEditingPaciente({ ...editingPaciente, Comentarios: e.target.value })}
                />
                <div>
                  <label>
                    Fumar:
                    <select
                      value={editingPaciente.Fumar ? 'Sí' : 'No'}
                      onChange={(e) => setEditingPaciente({ ...editingPaciente, Fumar: e.target.value === 'Sí' })}
                    >
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Actividad Física:
                    <select
                      value={editingPaciente.ActividadFisica ? 'Sí' : 'No'}
                      onChange={(e) => setEditingPaciente({ ...editingPaciente, ActividadFisica: e.target.value === 'Sí' })}
                    >
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Alcohol:
                    <input
                      type="text"
                      value={editingPaciente.Alcohol}
                      onChange={(e) => setEditingPaciente({ ...editingPaciente, Alcohol: e.target.value })}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Alergias:
                    <input
                      type="text"
                      value={editingPaciente.Alergias}
                      onChange={(e) => setEditingPaciente({ ...editingPaciente, Alergias: e.target.value })}
                    />
                  </label>
                </div>
                {/* ... (otros campos) */}
                <button onClick={handleGuardarCambios}>Guardar Cambios</button>
              </div>
            ) : (
              <div>
                <button
                  className="eliminar-button common-button"
                  onClick={() => handleConfirmarEliminar(paciente.Id)}
                >
                  Eliminar
                </button>
                <button
                  className="editar-button common-button"
                  onClick={() => handleEditar(paciente.Id)}
                >
                  Editar
                </button>
                {confirmacionEliminar === paciente.Id && (
                  <div className="confirmacion-eliminar">
                    <p>¿Estás seguro de que quieres eliminar a este paciente?</p>
                    <button onClick={() => handleEliminar(paciente.Id)}>Sí</button>
                    <button onClick={handleCancelarEliminar}>No</button>
                  </div>
                )}
                {expandedPacienteId === paciente.Id && expandedAttributes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PacientesList;
