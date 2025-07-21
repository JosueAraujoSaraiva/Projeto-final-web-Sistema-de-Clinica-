const paciente = require('../models/paciente');

// Criação de paciente
exports.criarPaciente = async (req, res) => {
  const { nome, telefone, cpf, endereco } = req.body;

  if (!nome || !telefone || !cpf || !endereco) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  try {
    const pacienteExistente = await paciente.findUnique({
      where: { cpf },
    });

    if (pacienteExistente) {
      return res.status(409).json({ erro: 'CPF já cadastrado' });
    }

    const novoPaciente = await paciente.create({
      data: { nome, telefone, cpf, endereco },
    });

    res.status(201).json(novoPaciente);
  } catch (err) {
    console.error('Erro ao criar paciente:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Listar pacientes
exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await paciente.findMany();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pacientes' });
  }
};

// Buscar paciente por ID
exports.buscarPacientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pacienteEncontrado = await paciente.findUnique({
      where: { id: Number(id) },
    });

    if (!pacienteEncontrado) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.json(pacienteEncontrado);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar paciente' });
  }
};

// Atualizar paciente
exports.atualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, cpf, endereco } = req.body;

  try {
    const pacienteAtualizado = await paciente.update({
      where: { id: Number(id) },
      data: { nome, telefone, cpf, endereco },
    });

    res.json(pacienteAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar paciente:', err);

    if (err.code === 'P2025') { // registro não encontrado no Prisma
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.status(500).json({ erro: 'Erro ao atualizar paciente' });
  }
};

// Deletar paciente
exports.deletarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    await paciente.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar paciente:', err);

    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    res.status(500).json({ erro: 'Erro ao deletar paciente' });
  }
};