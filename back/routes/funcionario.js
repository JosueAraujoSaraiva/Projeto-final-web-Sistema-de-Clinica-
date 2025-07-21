const express = require('express');
const router = express.Router(); 
//const verifyToken = require('../middleware/verifyToken');

const funcionarioController = require('../controllers/funcionarioController');

router.post('/criar', funcionarioController.criarFuncionario);
router.get('/listar', funcionarioController.listarFuncionarios);
router.get('/buscarPorId/:id', funcionarioController.buscarFuncionarioPorId);
router.put('/atualizar/:id', funcionarioController.atualizarFuncionario);
router.delete('/deletar/:id', funcionarioController.deletarFuncionario);

module.exports = router; 

