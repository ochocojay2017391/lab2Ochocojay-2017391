const express = require('express');
const cursoControlador = require('../controllers/cursos.controller');
const md_autenticacion = require('../middlewares/autentificacion');

const api = express.Router();
api.post('/agregarCursos', md_autenticacion.Auth, cursoControlador.agregarCursos);
api.get('/obtenerCursos', md_autenticacion.Auth, cursoControlador.agregarCursos);
api.get('/editarRespuestaCursos', md_autenticacion.Auth, cursoControlador.editarRespuestaCursos);

module.exports = api;