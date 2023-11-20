// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './LandingPage/LandingPage.js';
import Inicio from './Inicio/Inicio.js';
import LandingPageM from './LandingPageMedico/LandingMedico.js';
import Ingreso from './Ingreso/Ingreso.js';
import Registro from './Resgistro/Registro.js';
import Turnos from './Turnos/Turnos.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landingpaciente" element={<LandingPage />} />
        <Route path="/landingmedico" element={<LandingPageM />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/turnos" element={<Turnos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;