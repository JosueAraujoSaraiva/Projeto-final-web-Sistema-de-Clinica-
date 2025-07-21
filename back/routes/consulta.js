const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.post('/criar', consultaController.cadastrarConsulta);          // CREATE
router.get('/listar', consultaController.listarConsultas);               // READ ALL
router.get('/buscar/:id', consultaController.buscarConsultaPorId);       // READ ONE
router.put('/atualizar/:id', consultaController.atualizarConsulta);      // UPDATE
router.delete('/deletar/:id', consultaController.deletarConsulta);       // DELETE

module.exports = router;
