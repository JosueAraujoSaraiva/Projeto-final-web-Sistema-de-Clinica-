const paciente = require('../models/paciente');

// Criação de paciente
exports.criarPaciente = async (req, res) => {
  const {
    nome,
    cpf,
    dataNascimento,
    sexo,
    telefone,
    email,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    observacoes
  } = req.body;

  // Validação básica dos campos obrigatórios
  if (!nome || !cpf || !telefone) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, cpf e telefone' });
  }

  try {
    // Verifica se CPF já existe
    const pacienteExistente = await paciente.findUnique({
      where: { cpf },
    });

    if (pacienteExistente) {
      return res.status(409).json({ erro: 'CPF já cadastrado' });
    }

    // Cria novo paciente
    const novoPaciente = await paciente.create({
      data: {
        nome,
        cpf,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        sexo,
        telefone,
        email,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        observacoes,
      },
    });

    return res.status(201).json(novoPaciente);
  } catch (err) {
    console.error('Erro ao criar paciente:', err);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Listar pacientes
exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await paciente.findMany();
    return res.json(pacientes);
  } catch (err) {
    console.error('Erro ao buscar pacientes:', err);
    return res.status(500).json({ erro: 'Erro ao buscar pacientes' });
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

    return res.json(pacienteEncontrado);
  } catch (err) {
    console.error('Erro ao buscar paciente:', err);
    return res.status(500).json({ erro: 'Erro ao buscar paciente' });
  }
};

// Atualizar paciente
exports.atualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    cpf,
    dataNascimento,
    sexo,
    telefone,
    email,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    observacoes
  } = req.body;

  try {
    const pacienteAtualizado = await paciente.update({
      where: { id: Number(id) },
      data: {
        nome,
        cpf,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        sexo,
        telefone,
        email,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        observacoes,
      },
    });

    return res.json(pacienteAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar paciente:', err);

    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    return res.status(500).json({ erro: 'Erro ao atualizar paciente' });
  }
};

// Deletar paciente
exports.deletarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    await paciente.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar paciente:', err);

    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }

    return res.status(500).json({ erro: 'Erro ao deletar paciente' });
  }
};
