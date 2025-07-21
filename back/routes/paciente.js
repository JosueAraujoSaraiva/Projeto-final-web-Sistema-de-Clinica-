const express = require('express');
const router = express.Router(); 
//const verifyToken = require('../middleware/verifyToken');

const pacienteController = require('../controllers/pacienteController');

router.post('/criar', pacienteController.criarPaciente);
router.get('/listar', pacienteController.listarPacientes);
router.get('/buscarPorId/:id', pacienteController.buscarPacientePorId);
router.put('/atualizar/:id', pacienteController.atualizarPaciente);
router.delete('/deletar/:id', pacienteController.deletarPaciente);

module.exports = router; 

