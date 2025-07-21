import React from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="logo">Clínica Sys</div>
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/pacientes" className={({ isActive }) => isActive ? 'active' : ''}>
            Pacientes
          </NavLink>
        </li>
        <li>
          <NavLink to="/funcionarios" className={({ isActive }) => isActive ? 'active' : ''}>
            Funcionários
          </NavLink>
        </li>
        <li>
          <NavLink to="/agendamentos" className={({ isActive }) => isActive ? 'active' : ''}>
            Agendamentos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
