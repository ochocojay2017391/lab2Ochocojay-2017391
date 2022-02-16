const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = Schema({
    descripcion: String,
    categoria: String,
    respuestas: [{
        textoRespuesta: String,
        idMaestroRespuesta: { type: Schema.Types.ObjectId, ref: 'Maestros' }
    }],
    idCreadorCurso: { type: Schema.Types.ObjectId, ref: 'Maestros'}
});

module.exports = mongoose.model('Cursos', CursoSchema);