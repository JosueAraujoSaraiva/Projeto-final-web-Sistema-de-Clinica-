const consulta = require('../models/consulta');
const paciente = require('../models/paciente');
const funcionario = require('../models/funcionario');



// Criar nova consulta
exports.cadastrarConsulta = async (req, res) => {
    const { pacienteId, funcionarioId, dataConsulta, observacoes, status } = req.body;
  
    try {
      // Verifica se o paciente existe
      const pacienteConsulta = await paciente.findUnique({ where: { id: pacienteId } });
      if (!pacienteConsulta) {
        return res.status(404).json({ erro: 'Paciente não encontrado' });
      }
  
      // Verifica se o usuário (funcionário/profissional) existe
      const funcionarioConsulta = await funcionario.findUnique({ where: { id: funcionarioId } });
      if (!funcionarioConsulta) {
        return res.status(404).json({ erro: 'Profissional não encontrado' });
      }
  
      // Cria a consulta
      const novaConsulta = await consulta.create({
        data: {
          dataConsulta: new Date(dataConsulta),
          observacoes,
          status,
          pacienteId,
          funcionarioId
        }
      });
  
      res.status(201).json(novaConsulta);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao agendar consulta' });
    }
  };

// Listar todas as consultas
exports.listarConsultas = async (req, res) => {
    try {
      const consultas = await consulta.findMany({
        orderBy: {
          dataConsulta: "asc"
        },
        include: {
          paciente: true,
          funcionario: {
            select: {
              id: true,
              nomeCompleto: true,
              email: true,
              dataNascimento: true,
              sexo: true,
              telefone: true,
              cargo: true,
            }
          },
          exames: true
        }
      });

      res.json(consultas);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      res.status(500).json({ erro: 'Erro ao buscar consultas' });
    }
  };
  
  exports.buscarConsultaPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const consultaEncontrada = await consulta.findUnique({
        where: { id: Number(id) },
        include: {
          paciente: true,
          funcionario: {
            select: {
              id: true,
              nomeCompleto: true,
              email: true,
              sexo: true,
              telefone: true,
              cargo: true,
            }
          },
          exames: true
        }
      });
  
      if (!consultaEncontrada) {
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }
  
      res.json(consultaEncontrada);
    } catch (err) {
      console.error('Erro ao buscar consulta:', err);
      res.status(500).json({ erro: 'Erro ao buscar consulta' });
    }
  };
  
// Atualizar consulta
exports.atualizarConsulta = async (req, res) => {
  const { id } = req.params;
  const { dataConsulta, observacoes, status, pacienteId, funcionarioId } = req.body;

  try {
    const consultaAtualizada = await consulta.update({
      where: { id: parseInt(id) },
      data: {
        dataConsulta: new Date(dataConsulta),
        observacoes,
        status,
        pacienteId,
        funcionarioId
      }
    });

    res.status(200).json(consultaAtualizada);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar consulta' });
  }
};

// Deletar consulta
exports.deletarConsulta = async (req, res) => {
  const { id } = req.params;

  try {
    await consulta.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ mensagem: 'Consulta deletada com sucesso' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao deletar consulta' });
  }
};
