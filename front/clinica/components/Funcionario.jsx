import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFuncionario } from "../service/api";

const Funcionarios = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeFuncionario: "",
    cpfFuncionario: "",
    dataNascimentoFuncionario: "",
    sexoFuncionario: "",
    telefoneFuncionario: "",
    emailFuncionario: "",
    logradouroFuncionario: "",
    numeroFuncionario: "",
    bairroFuncionario: "",
    cidadeFuncionario: "",
    estadoFuncionario: "",
    cepFuncionario: "",
    cargoFuncionario: "",
    departamentoFuncionario: "",
    dataAdmissaoFuncionario: "",
    salarioFuncionario: "",
    observacoesFuncionario: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nomeCompleto: form.nomeFuncionario,
      cpf: form.cpfFuncionario,
      dataNascimento: form.dataNascimentoFuncionario,
      sexo: form.sexoFuncionario,
      telefone: form.telefoneFuncionario,
      email: form.emailFuncionario,
      logradouro: form.logradouroFuncionario,
      numero: form.numeroFuncionario,
      bairro: form.bairroFuncionario,
      cidade: form.cidadeFuncionario,
      estado: form.estadoFuncionario,
      cep: form.cepFuncionario,
      cargo: form.cargoFuncionario,
      departamento: form.departamentoFuncionario,
      dataAdmissao: form.dataAdmissaoFuncionario,
      salario: parseFloat(form.salarioFuncionario || 0),
      observacoes: form.observacoesFuncionario
    };

    try {
      await createFuncionario(payload);
      alert("Funcionário cadastrado com sucesso!");
      setForm({
        nomeFuncionario: "",
        cpfFuncionario: "",
        dataNascimentoFuncionario: "",
        sexoFuncionario: "",
        telefoneFuncionario: "",
        emailFuncionario: "",
        logradouroFuncionario: "",
        numeroFuncionario: "",
        bairroFuncionario: "",
        cidadeFuncionario: "",
        estadoFuncionario: "",
        cepFuncionario: "",
        cargoFuncionario: "",
        departamentoFuncionario: "",
        dataAdmissaoFuncionario: "",
        salarioFuncionario: "",
        observacoesFuncionario: ""
      });
      navigate("/funcionarios");
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error.response?.data || error.message);
      alert("Erro ao cadastrar funcionário.");
    }
  };

  return (
    <div className="pagina-pacientes">
      <h2>Cadastro de Funcionários</h2>

      <form className="form-paciente" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="nomeFuncionario" value={form.nomeFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>CPF:</label>
              <input type="text" name="cpfFuncionario" value={form.cpfFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Data de Nascimento:</label>
              <input type="date" name="dataNascimentoFuncionario" value={form.dataNascimentoFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Sexo:</label>
              <select name="sexoFuncionario" value={form.sexoFuncionario} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <input type="text" name="telefoneFuncionario" value={form.telefoneFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="emailFuncionario" value={form.emailFuncionario} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Logradouro:</label>
              <input type="text" name="logradouroFuncionario" value={form.logradouroFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Número:</label>
              <input type="text" name="numeroFuncionario" value={form.numeroFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Bairro:</label>
              <input type="text" name="bairroFuncionario" value={form.bairroFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Cidade:</label>
              <input type="text" name="cidadeFuncionario" value={form.cidadeFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <input type="text" name="estadoFuncionario" value={form.estadoFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>CEP:</label>
              <input type="text" name="cepFuncionario" value={form.cepFuncionario} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Informações Profissionais</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Cargo:</label>
              <input type="text" name="cargoFuncionario" value={form.cargoFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Departamento:</label>
              <input type="text" name="departamentoFuncionario" value={form.departamentoFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Data de Admissão:</label>
              <input type="date" name="dataAdmissaoFuncionario" value={form.dataAdmissaoFuncionario} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Salário:</label>
              <input type="number" name="salarioFuncionario" value={form.salarioFuncionario} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-group full-width">
              <label>Observações:</label>
              <textarea name="observacoesFuncionario" value={form.observacoesFuncionario} onChange={handleChange}></textarea>
            </div>
          </div>
        </fieldset>

        <button type="submit">Cadastrar Funcionário</button>
      </form>
    </div>
  );
};

export default Funcionarios;
