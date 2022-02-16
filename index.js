const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;                                                                  
mongoose.connect('mongodb://localhost:27017/Lab2Ochocojay', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos de lab2.");

    app.listen(3000, function () {
        console.log("Hola este programa esta corriendo en el puerto 3000")
    });

}).catch(error => console.log(error));