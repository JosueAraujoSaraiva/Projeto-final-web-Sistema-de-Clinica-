import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Pacientes from "../components/Pacientes.jsx";
import Funcionarios from "../components/Funcionario.jsx";
import Agendamentos from "../components/Agendamentos.jsx";

import '../styles/style.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
