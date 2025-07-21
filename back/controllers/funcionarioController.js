const funcionario = require('../models/funcionario');

// Criação de funcionário
exports.criarFuncionario = async (req, res) => {
  const {
    nomeCompleto,
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
    cargo,
    departamento,
    dataAdmissao,
    salario,
    observacoes
  } = req.body;

  // Validação de campos obrigatórios
  if (!nomeCompleto || !cpf || !dataNascimento || !dataAdmissao) {
    return res.status(400).json({ erro: 'Dados incompletos (nome, CPF, data de nascimento e admissão são obrigatórios)' });
  }

  try {
    // Verifica se CPF já existe
    const funcionarioExistente = await funcionario.findUnique({
      where: { cpf }
    });

    if (funcionarioExistente) {
      return res.status(409).json({ erro: 'CPF já cadastrado' });
    }

    // Cria novo funcionário
    const novoFuncionario = await funcionario.create({
      data: {
        nomeCompleto,
        cpf,
        dataNascimento: new Date(dataNascimento),
        sexo,
        telefone,
        email,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        cargo,
        departamento,
        dataAdmissao: new Date(dataAdmissao),
        salario: salario ? parseFloat(salario) : null,
        observacoes
      }
    });

    res.status(201).json(novoFuncionario);
  } catch (err) {
    console.error('Erro ao criar funcionário:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Listar todos os funcionários
exports.listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await funcionario.findMany();
    res.json(funcionarios);
  } catch (err) {
    console.error('Erro ao buscar funcionários:', err);
    res.status(500).json({ erro: 'Erro ao buscar funcionários' });
  }
};

// Buscar funcionário por ID
exports.buscarFuncionarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const funcionario = await funcionario.findUnique({
      where: { id: Number(id) }
    });

    if (!funcionario) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.json(funcionario);
  } catch (err) {
    console.error('Erro ao buscar funcionário:', err);
    res.status(500).json({ erro: 'Erro ao buscar funcionário' });
  }
};

// Atualizar funcionário
exports.atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const {
    nomeCompleto,
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
    cargo,
    departamento,
    dataAdmissao,
    salario,
    observacoes
  } = req.body;

  try {
    const funcionarioAtualizado = await funcionario.update({
      where: { id: Number(id) },
      data: {
        nomeCompleto,
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
        cargo,
        departamento,
        dataAdmissao: dataAdmissao ? new Date(dataAdmissao) : undefined,
        salario: salario ? parseFloat(salario) : undefined,
        observacoes
      }
    });

    res.json(funcionarioAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);

    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.status(500).json({ erro: 'Erro ao atualizar funcionário' });
  }
};

// Deletar funcionário
exports.deletarFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    await funcionario.delete({
      where: { id: Number(id) }
    });

    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar funcionário:', err);

    if (err.code === 'P2025') {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.status(500).json({ erro: 'Erro ao deletar funcionário' });
  }
};