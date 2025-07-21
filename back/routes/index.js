const express = require('express');
const router = express.Router();


const pacienteRoutes = require('./paciente');
const funcionarioRoutes = require('./funcionario');
const consultaRoutes = require('./consulta');
//const cardRoutes = require('./card');
//const boardRoutes = require('./board');
//const listaRoutes = require('./lista');

router.use('/paciente', pacienteRoutes);
router.use('/funcionario', funcionarioRoutes);
router.use('/consulta', consultaRoutes);
//router.use('/cards', verifyToken, cardRoutes);
//router.use('/boards', verifyToken, boardRoutes);
//router.use('/listas', verifyToken, listaRoutes);//

module.exports = router;

