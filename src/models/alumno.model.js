const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlumnosSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,

});

module.exports = mongoose.model('ususarios', AlumnosSchema);