const Maestro = require('../models/maestros.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function Registrar(req, res) {
    var parametros = req.body;
    var maestroModel = new Maestro();

    if(parametros.nombre && parametros.apellido && 
        parametros.email && parametros.password) {
            maestroModel.nombre = parametros.nombre;
            maestroModel.apellido = parametros.apellido;
            maestroModel.email = parametros.email;
            maestroModel.rol = 'MAESTRO';

            

            Maestro.find({ email : parametros.email }, (err, mestroEncontrado) => {
                if ( mestroEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        maestroModel.password = passwordEncriptada;

                        maestroModel.save((err, maestroGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!maestroGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Maestro'});
                            
                            return res.status(200).send({ maestro: maestroGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}


function Login(req, res) {
    var parametros = req.body;
    Maestro.findOne({ email : parametros.email }, (err, maestroEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(maestroEncontrado){
            // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, maestroEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if ( verificacionPassword ) {
                        // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(maestroEncontrado) })
                        } else {
                            maestroEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ maestro: maestroEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}

function EditarMaestro(req, res) {
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
    Login,
    EditarMaestro
}