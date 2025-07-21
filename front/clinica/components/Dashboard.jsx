import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const [pacientes, setPacientes] = useState(0);
  const [funcionarios, setFuncionarios] = useState(0);
  const [agendamentosHoje, setAgendamentosHoje] = useState(0);
  const [agendamentosPendentes, setAgendamentosPendentes] = useState(0);
  const [proxAgendamentos, setProxAgendamentos] = useState([]);

  useEffect(() => {
    // Simulação de requisições - substitua pelos seus endpoints reais
    axios.get("http://localhost:3001/api/dashboard/contagens")
      .then(res => {
        const { pacientes, funcionarios, hoje, pendentes } = res.data;
        setPacientes(pacientes);
        setFuncionarios(funcionarios);
        setAgendamentosHoje(hoje);
        setAgendamentosPendentes(pendentes);
      })
      .catch(err => console.error("Erro ao buscar contagens:", err));

    axios.get("http://localhost:3001/api/dashboard/proximos-agendamentos")
      .then(res => setProxAgendamentos(res.data))
      .catch(err => console.error("Erro ao buscar próximos agendamentos:", err));

    axios.get("http://localhost:3001/api/dashboard/agendamentos-semana")
      .then(res => {
        const { dias, total } = res.data;
        renderGrafico(dias, total);
      })
      .catch(err => console.error("Erro ao buscar agendamentos da semana:", err));
  }, []);

  const renderGrafico = (labels, data) => {
    const ctx = document.getElementById("graficoAgendamentos").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Agendamentos",
          data,
          backgroundColor: "#2563eb"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  };

  return (
    <div className="pagina-dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Pacientes</h3>
          <p className="numero">{pacientes}</p>
        </div>
        <div className="card">
          <h3>Funcionários</h3>
          <p className="numero">{funcionarios}</p>
        </div>
        <div className="card">
          <h3>Agendamentos Hoje</h3>
          <p className="numero">{agendamentosHoje}</p>
        </div>
        <div className="card">
          <h3>Agendamentos Pendentes</h3>
          <p className="numero">{agendamentosPendentes}</p>
        </div>
      </div>

      <section className="dashboard-grafico">
        <h3>Agendamentos da Semana</h3>
        <canvas id="graficoAgendamentos" width="600" height="300"></canvas>
      </section>

      <section className="prox-agendamentos">
        <h3>Próximos Agendamentos</h3>
        <ul>
          {proxAgendamentos.length === 0 && <li>Nenhum agendamento encontrado.</li>}
          {proxAgendamentos.map((item, i) => (
            <li key={i}>
              {item.data} {item.hora} - {item.paciente} - {item.tipo}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
