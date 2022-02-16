const alumno = require('../models/alumno.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function Registrar(req, res) {
    var parametros = req.body;
    var alumnoModel = new Alumno();

    if(parametros.nombre && parametros.apellido && 
        parametros.email && parametros.password) {
            alumnoModel.nombre = parametros.nombre;
            alumnoModel.apellido = parametros.apellido;
            alumnoModel.email = parametros.email;
            alumnoModel.rol = 'ALUMNO';

            Alumno.find({ email : parametros.email }, (err, alumnoEncontrado) => {
                if ( alumnoEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        alumnoModel.password = passwordEncriptada;

                        alumnoModel.save((err, alumnoGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!alumnoGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Maestro'});
                            
                            return res.status(200).send({ maestro: alumnoGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}


function EditarAlumno(req, res) {
    var idMaes = req.params.idMaestro;
    var parametros = req.body;    

    if ( idMaes !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios'});

    Maestro.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, maestroActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!maestroActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario'});
            
            return res.status(200).send({maestro : maestroActualizado})
        })
}


module.exports = {
    Registrar,
    
    EditarAlumno
}