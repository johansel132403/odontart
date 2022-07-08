

let jtw = require('jwt-simple')

let moment = require('moment');

let secret = 'HelloWord2022unoTresDosCuatroYes_24sii';





exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({Mensaje:'La peticion no tiene la cabecera de autenticacion'});
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
        
    try {
        var  payload = jtw.decode(token, secret);
        
  
      //ESTE CODIGO QUE ESTA AQUI ES PARA QUE CUANDO PASE DE MOMENT( LA HORA INDICADA ) TENGAMOS QUE INICIAL
      //SESION OTRA VEZ....


    //  if(payload.exp <= moment().unix()){
    //      return res.status(200).send({Mensaje:'El token ha expirado'}); // tenemos que provar esto cambiandole la hora...
    //  }
     
 } catch (error) {
     
    return res.status(404).send({Mensaje: 'El token no es valido'})

     
 }
 /*
 
 Vamos a juntar el payload a la requete(req) para tener siempre en los controladores el objeto del usuario 
 logeado,

 en lo controladores tenemos acceso al req.user y tendo a dentro todos los datos de usuario que esta enviando el 
 token de acuerdo el usuario que esta ....
 
 */

 req.user = payload;


 //Esto nos ayuda a saltar a lo siguiente que vaya hacer node y poder ejecutar la accion del  controlador ...
 next();
}