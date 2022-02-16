const Cursos = require('../models/cursos.model');


function agregarCursos(req, res){
    var parametros = req.body;
    var cursoModel = new Cursos();

    if(parametros.descripcion && parametros.categoria){
        cursoModel.descripcion = parametros.descripcion;
        cursoModel.categoria = parametros.categoria;
        cursoModel.idCreadorCurso = req.user.sub;

        cursoModel.save((err, cursoGuardada) => {
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoGuardada) return res.status(500).send({ mensaje: "Error al guardar el curso"});
            
            return res.status(200).send({ Curso: cursoGuardada });
        });
    } else{
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
    }
}

function obtenerCursos(req, res) {
    Cursos.find({}, (err, CursosEncontradas) => {
        if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if(!CursosEncontradas) return res.status(500).send({ mensaje: "Error al obtener el curso."});

        return res.status(200).send({ curso: CursosEncontradas });
    }).populate('idCreadorCurso', 'nombre email')
        .populate('respuestas.idMaestroRespuesta', 'nombre apellido email');
}


function editarRespuestaCursos(req, res) {
    var idCurs = req.params.idCursos;
    var parametros = req.body;

    Cursos.findOneAndUpdate({ respuestas: { $elemMatch : { _id: idResp, idMaestroRespuesta: req.user.sub } } },
        { "respuestas.$.textoRespuesta": parametros.textoRespuesta }, {new : true}, (err, cursoEditada)=>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!cursoEditada) return res.status(500)
                .send({ mensaje: "No tiene acceso para editar esta respuesta"});

            return res.status(200).send({ curso: cursoEditada });
    })
}


module.exports = {
    agregarCursos,
    obtenerCursos,
    editarRespuestaCursos
}