const express = require('express');
const maestroControlador = require('../controllers/maestros.controller');
const md_autenticacion = require('../middlewares/autentificacion');

const api = express.Router();

api.post('/registrar', maestroControlador.Registrar);
api.post('/login', maestroControlador.Login);
api.put('/editarMaestro/:idMaestro', md_autenticacion.Auth, maestroControlador.EditarMaestro);

module.exports = api;