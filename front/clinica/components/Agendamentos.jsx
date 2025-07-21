import React, { useState, useEffect } from 'react';
import { createConsulta, getConsulta, updateConsulta, deleteConsulta } from '../service/apiAgendamento';
import { getPaciente , getFuncionario } from '../service/api';

export default function Agendamentos() {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const [form, setForm] = useState({
    pacienteId: '',
    funcionarioId: '',
    dataConsulta: '',
    observacoes: '',
    status: 'AGENDADO'
  });

  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarConsultas();
    carregarPacientes();
    carregarFuncionarios();
  }, []);

  const carregarConsultas = async () => {
    const dados = await getConsulta();
    setConsultas(dados);
  };

  const carregarPacientes = async () => {
    const dados = await getPaciente();
    setPacientes(dados);
  };

  const carregarFuncionarios = async () => {
    const dados = await getFuncionario();
    setFuncionarios(dados);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataCompleta = new Date(`${form.data}T${form.horario}:00`);
  
    const payload = {
      pacienteId: parseInt(form.pacienteId),
      funcionarioId: parseInt(form.funcionarioId),
      dataConsulta: dataCompleta,
      observacoes: form.observacoes,
      status: form.status
    };
  
    if (editando) {
      await updateConsulta(editando, payload);
      setEditando(null);
    } else {
      await createConsulta(payload);
    }
  
    setForm({
      pacienteId: '',
      funcionarioId: '',
      data: '',
      horario: '',
      observacoes: '',
      status: 'AGENDADO'
    });
  
    carregarConsultas();
  };

  const handleEdit = (consulta) => {
    setForm({
      pacienteId: consulta.pacienteId,
      funcionarioId: consulta.funcionarioId,
      data: consulta.data,
      horario: consulta.horario,
    });
    setEditando(consulta.id);
  };

  const handleDelete = async (id) => {
    await deleteConsulta(id);
    carregarConsultas();
  };

  return (
    <div className="pagina-funcionarios">
      <h2>Agendamentos</h2>
      <form onSubmit={handleSubmit} className="form-funcionario">
        <div className="form-grid">
          <div className="form-group">
            <label>Paciente</label>
            <select name="pacienteId" value={form.pacienteId} onChange={handleChange} required>
              <option value="">Selecione</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Funcionário</label>
            <select name="funcionarioId" value={form.funcionarioId} onChange={handleChange} required>
              <option value="">Selecione</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>{f.nomeCompleto}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Data</label>
            <input type="date" name="data" value={form.data} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Horário</label>
            <input type="time" name="horario" value={form.horario} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="btn-salvar">Salvar</button>
      </form>

      <div className="lista-funcionarios">
        <h3>Consultas Agendadas</h3>
        <ul>
          {consultas.map((c) => (
            <li key={c.id}>
              <strong>Paciente:</strong> {c.paciente?.nome || 'Indefinido'} | 
              <strong> Funcionário:</strong> {c.funcionario?.nomeCompleto || 'Indefinido'} | 
              <strong> Data:</strong> {c.data} | 
              <strong> Horário:</strong> {c.horario}
              <button onClick={() => handleEdit(c)}>Editar</button>
              <button onClick={() => handleDelete(c.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
