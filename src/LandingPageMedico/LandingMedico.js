  import React, { useRef, useEffect, useState } from 'react';
  import Chart from 'chart.js/auto';
  import NavBarMedico from '../NavBarMedico/NavBarM.js';
  import './LandingMedico.css';
  import PacientesList from '../Listas/PacientesList.js';
  import muñecos from '../images/muñecos.png'
  import perita from '../images/perita.png'

  const LandingMedico = () => {
    const [turnosData, setTurnosData] = useState([]);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [medicoData, setMedicoData] = useState({
      IdPerfil: null,
      NombreApellido: "",
      Direccion: "",
      Dni: "",
      FotoPerfil: null,
      IdMedico: 1,
      Id: null
    });
    const [perfilData, setPerfilData] = useState({
      IdPerfil: null,
      NombreApellido: "",
      Direccion: "",
      Dni: "",
      Contraseña: "",
      FotoPerfil: "",
      IdMedico: 3,
      Id: null,
    });
    const chartTurnosRef = useRef(null);
    const chartPacientesRef = useRef(null);
    
    const [formDataServicio, setFormDataServicio] = useState({
      NombreServicio: '',
      Precio: '',
      TipoServicio: 'presencial',
      IdMedico: 1, // <-- Asegúrate de que coincida con el nombre del campo esperado en el servidor
      // Agrega más campos según sea necesario
    });
    

    // Datos para los gráficos de barras (ajustar según sea necesario)
    const dataTurnos = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Turnos',
          backgroundColor: 'rgba(46, 204, 113, 0.5)',
          borderColor: 'rgba(46, 204, 113, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(46, 204, 113, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(46, 204, 113, 1)',
          data: [5, 10, 15, 8, 12, 7, 10, 13, 18, 15, 20, 12],
        },
      ],
    };
    const dataPacientes = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Pacientes',
          backgroundColor: 'rgba(52, 152, 219, 0.5)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(52, 152, 219, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(52, 152, 219, 1)',
          data: [8, 12, 18, 10, 15, 20, 7, 12, 16, 22, 14, 10],
        },
      ],
    };
   


    useEffect(() => {
      if (chartTurnosRef.current) {
        chartTurnosRef.current.destroy();
      }
    
      if (chartPacientesRef.current) {
        chartPacientesRef.current.destroy();
      }
    
      chartTurnosRef.current = new Chart(document.getElementById('chartTurnos'), {
        type: 'line',
        data: dataTurnos,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Meses',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad de Turnos',
              },
            },
          },
        },
      });
      
      chartPacientesRef.current = new Chart(document.getElementById('chartPacientes'), {
        type: 'line',
        data: dataPacientes,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Meses',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad de Pacientes',
              },
            },
          },
        },
      });

      
      
      const fetchTurnosData = async () => {
        try {
          const response = await fetch('http://localhost:8000/turnos/turnos');
          if (response.ok) {
            const turnosDataFromServer = await response.json();
            // Excluir la columna 'IdTurno' de la lista de campos
            const turnosDataFormatted = turnosDataFromServer.map(({ IdTurno, ...rest }) => rest);
            setTurnosData(turnosDataFormatted);
          } else {
            console.error('Error al obtener datos de turnos:', response.status);
          }
        } catch (error) {
          console.error('Error de red al obtener datos de turnos:', error);
        }
      };

      const fetchPerfilData = async () => {
        try {
          // Asegúrate de tener el IdMedico disponible en el estado (medicoData)
          const idMedico = medicoData.IdMedico;
      
          // Verifica si IdMedico es válido antes de realizar la solicitud
          if (idMedico) {
            const response = await fetch(`http://localhost:8000/perfiles/perfiles/${idMedico}`);
            if (response.ok) {
              const perfilDataFromServer = await response.json();
              setPerfilData(perfilDataFromServer);
            } else {
              console.error('Error al obtener datos del perfil del médico:', response.status);
            }
          } else {
            console.error('IdMedico es undefined o null');
          }
        } catch (error) {
          console.error('Error de red al obtener datos del médico:', error);
        }
      };
  
      // Llamamos a la función para obtener la información del perfil del médico
      fetchPerfilData();
      
      fetchTurnosData();
    }, [medicoData]);
    

    const handleInputChangeServicio = (e) => {
      const { name, value } = e.target;
    
      // Modifica el valor directamente en lugar de obtenerlo del estado
      setFormDataServicio({
        ...formDataServicio,
        [name]: name === 'IdMedico' ? 1 : value,
      });
    };
    
    const handleCrearServicio = async () => {
      try {
        // Asegúrate de tener medicoData disponible antes de continuar
        if (!medicoData) {
          console.error('medicoData no está definido');
          return;
        }
  
        // Establecer directamente el IdMedico en la solicitud
        const response = await fetch('http://localhost:8000/servicios/servicios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formDataServicio,
            IdMedico: medicoData.IdMedico,
          }),
        });
  
        if (response.ok) {
          // Manejar el éxito, por ejemplo, mostrar un mensaje al usuario
          console.log('Servicio creado exitosamente');
          setSuccessMessageVisible(true);
  
          // Ocultar el mensaje después de unos segundos (puedes ajustar el tiempo según tus necesidades)
          setTimeout(() => {
            setSuccessMessageVisible(false);
  
            // Vaciar los campos de texto después del éxito
            setFormDataServicio({
              NombreServicio: '',
              Precio: '',
              TipoServicio: 'presencial',
              IdMedico: 1,
            });
          }, 3000);
        } else {
          // Manejar errores, mostrar mensaje al usuario, etc.
          console.error('Error al crear el servicio:', response.status);
        }
      } catch (error) {
        console.error('Error de red al crear el servicio:', error);
      }
    };
    

    return (
      <div>
        <NavBarMedico />
        <div className="landing-container">
          <div id='dashboard' className="dashboard">
            <h2>Estadísticas</h2>
            <div className="dashboard-stats">
              <div className="dashboard-stat">
                <p>Total de turnos este mes: {dataTurnos.datasets[0].data.reduce((acc, curr) => acc + curr, 0)}</p>
              </div>
              <div className="dashboard-stat">
                <p>Total de pacientes: {dataPacientes.datasets[0].data.reduce((acc, curr) => acc + curr, 0)}</p>
              </div>
            </div>
            <div className="graficos-container">
              <div className="grafico">
                <canvas id="chartTurnos" />
              </div>
              <div className="grafico">
                <canvas id="chartPacientes" />
              </div>
            </div>
          </div>
          <div className="opciones">
            
            {/* Contenedor para crear servicios */}
            <div className="crear-servicios-container">
              <h2>Crear Servicios</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="nombreServicio">Nombre del Servicio:</label>
                  <input
                  type="text"
                  id="NombreServicio"
                  name="NombreServicio"
                  value={formDataServicio.NombreServicio}
                  onChange={handleInputChangeServicio}
                />
                </div>
              <div className="form-group">
                <label htmlFor="Precio">Precio:</label>
                <input
                  type="text" // Puedes cambiarlo a "number" si prefieres un campo numérico
                  id="Precio"
                  name="Precio"
                  value={formDataServicio.Precio}
                  onChange={handleInputChangeServicio}
                />
              </div>
              <div className="form-group">
                <label htmlFor="TipoServicio">Tipo de Servicio:</label>
                <select
                id="TipoServicio"
                name="TipoServicio"
                value={formDataServicio.TipoServicio}
                onChange={handleInputChangeServicio}
                >
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
              </div>
                <input
                  type="hidden"
                  id="IdMedico"
                  name="IdMedico"
                  value={formDataServicio.IdMedico}
                  onChange={handleInputChangeServicio}
                />
                {/* Agrega más campos según sea necesario */}
                <button type="button" onClick={handleCrearServicio}>
                  Crear Servicio
                </button>
              </form>
              {successMessageVisible && (
            <div className="success-message">¡Servicio creado exitosamente!</div>
          )}
            </div>
            
            <div id="turnos" className="turnos-container">
            
              <h2>Turnos</h2>
              <ul>
                  {turnosData.map((turno) => (
                    <li key={turno.IdTurno}>
                      <p>Turno N°: {turno.Dni}</p>
                      <p>Fecha: {turno.FechaDisp}</p>
                      <p>Hora: {turno.HorarioDisp}</p>
                      {/* Agrega más campos según sea necesario */}
                    </li>
                  ))}
                </ul>
            </div>
            
            </div>
          <div id="pacientes" className="lista-pacientes">
            <PacientesList />
          </div>
          <div id="perfil" className="perfil-medico info-container">
            {/* Nuevo contenedor para el perfil del médico */}
            <h2>Tu Perfil</h2>
            <p>Nombre: {perfilData.NombreApellido}</p>
            <p>Dirección: {perfilData.Direccion}</p>
            <p>DNI: {perfilData.Dni}</p>
            <p>Tu Contraseña: {perfilData.Contraseña}</p>
            
            {/* Agrega más campos según sea necesario */}
          </div>
        </div>
      </div>
    );
  }

  export default LandingMedico;