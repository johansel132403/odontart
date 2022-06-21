let jwt = require('jwt-simple');

let moment = require('moment');

let secret = 'HelloWord2022unoTresDosCuatroYes_24sii';


exports.crearToken = function(user){
    
    var payload = {
        Sub: user.id,
        nombre: user.nombre,
        password: user.password,
        role: user.role,
        telefono: user.telefono,
        citas: user.citas,
        imagen: user.imagen,
        creado: moment().unix(),
        exp: moment().add(2,'days').unix()

    }
   return   jwt.encode(payload, secret)
}




