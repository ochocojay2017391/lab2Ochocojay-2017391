const express = require('express');
const alumnoControlador = require('../controllers/alumno.controller');
const md_autenticacion = require('../middlewares/autentificacion');

const api = express.Router();

api.post('/registrar', alumnoControlador.Registrar);
//api.post('/login', maestroControlador.Login);
//api.put('/editarMaestro/:idMaestro', md_autenticacion.Auth, maestroControlador.EditarMaestro);

module.exports = api;