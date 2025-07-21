import React, { useState } from "react";
import axios from "axios";

const Pacientes = () => {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    telefone: "",
    email: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/paciente/criar", form);
      alert("Paciente cadastrado com sucesso!");
      setForm({
        nome: "",
        cpf: "",
        dataNascimento: "",
        sexo: "",
        telefone: "",
        email: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      alert("Erro ao cadastrar paciente.");
    }
  };

  return (
    <div className="pagina-pacientes">
      <h2>Cadastro de Pacientes</h2>

      <form className="form-paciente" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome Completo</label>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>CPF</label>
              <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Data de Nascimento</label>
              <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select name="sexo" value={form.sexo} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contato</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div className="form-grid">
            <div className="form-group">
              <label>Logradouro</label>
              <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Número</label>
              <input type="text" name="numero" value={form.numero} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bairro</label>
              <input type="text" name="bairro" value={form.bairro} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Cidade</label>
              <input type="text" name="cidade" value={form.cidade} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input type="text" name="estado" value={form.estado} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input type="text" name="cep" value={form.cep} onChange={handleChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Observações</legend>
          <div className="form-group">
            <label>Informações adicionais</label>
            <textarea
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn-primario">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default Pacientes;
