
//let User = require('../../back-end/model/user.model');
let User = require('../model/user.model');

let Chat = require('../model/chat.model');

let bcrypt = require('bcryptjs');

let jwtServices = require('../services/jwt');

var mongoosePaginate = require('mongoose-pagination');

var fs = require('fs-extra');
var path = require('path');
const chatModel = require('../model/chat.model');
const Notificacion = require('../model/notificacion');
const {  uploadFileImgCloudinary, deleteImagenCloudinary } = require('../services/cloudinary');
const { Error } = require('mongoose');

function home( req, res ){
    res.status(200).send({
        Mensaje:'Mensaje de prueba'
    });
};


//Registrar un usuario... 
function saveUser( req, res ) {

    let param = req.body;
    console.log(param)

    let user = new User();

     
    if( param.nombre && param.apellido && param.email  && param.password ){

        user.nombre = param.nombre;
        user.apellido = param.apellido;   //*
        user.email = param.email;
        user.telefono = param.telefono;
        user.edad = null;          //*
        user.direccion = null;   //*
                    //*
        user.role = param.role;
        user.citas = null;
        user.imagen = null;
        user.activo = param.activo;
        user.calificar = false;
        user.fecha_entrada = '';
        user.fecha_salida = '';
        user.calificacion = '';
        user.online = null;

        

        User.find({email: user.email.toLowerCase() }).exec(( err, userr) => {

            if(err) return res.status(500).send({Mensaje:'Error con el ususario'});

            // Controlamos de que lo usuarios no se dupliquen...
            if( userr && userr.length >= 1 ){

            
               return  res.status(200).send({Mensaje:'Ya este correo esta registrado'})

            }else{

                bcrypt.hash( param.password, 8, (err, hash) => {
                    
                    user.password = hash;
              
                     
                    user.save(( err, userStored ) => {
                        
                        if( err ) return res.status(200).send({Mensaje:'Error al guardar el usuario'});
        
                        if( userStored ){
                           return res.status(200).send({ user: userStored });
                        }else{
                           return res.status(400).send({ Error: 'Error no hay datos guardados' });
                        }
                    });
                    
                });
            }

        });
       
        
     
    }else{
      return   res.status(400).send({ Error:'Hay compos que estan vacioo' });
    }


}

//Logear un usuario....
function loginUser( req,res ) {

    let params = req.body;
    
    let email = params.email;
    let password = params.password;

    
    
       console.log('em',email)
    
    User.findOne({ email: email.toLowerCase()}, (err, user) => {   
        
        console.log( 'ress', user ) 
        if(err) return res.status(500).send({Error: 'Error en la pericion'});

        
        if(user){
            // aqui estamos comparando la contraseña....
            bcrypt.compare(password, user.password, (err, hash) => {

                console.log('err',err)
                
                if(hash){
                   
                    //Aqui usamos jwt-simple para hacer un token, para que cada usuario tenga su propio token  
                    if(params.gettoken){
                   
                        console.log('bla bla bla')
                        //datos del token 
                        
                         return res.status(200).send({
                            token: jwtServices.crearToken(user)
                        })
                     //   params.gettoken = false
                        
                            }else{
                    

                                //devolver datos de los usuarios 
                                user.password = undefined; // aqui eliminamos el password porque no lo necesitamos en el user 
                                       
                                console.log('si paso',user)
                                  res.status(200).send({user})
                            }

                }else{
                    console.log('nooo')

                    return res.status(404).send({Mensaje:'Contraseña invalida'})
                }
            });

        }else{
            return res.status(404).send({Mensaje:'El usuario no esta registrado'})
        }

    });


}


//Obtener un usuario.... 
function getUser( req, res){
    console.log("user")

    let { id } = req.params;

    console.log('id',id)

    User.findById(id).exec(( err, user ) => { 

        if(err) return res.status(404).send({Error: 'El usuario no existe'});

       if(user){
           return res.status(200).send({user})
       }else{
           return res.status(404).send({Error: 'Error al solicitar un usuario'});
       }
    
    });

}

//Obtener todos los usuarios
function getAllUsers( req, res ){

    let params = req.params;

    let page = 1;

    if(params.page){
        page = params.page;
    }

       
    let itemsPerPage = 4; 

    //Este metodo tenia un paginate pero se lo quite, para que se pueda hacer el scroll completo...

    User.find().sort('id').exec( /*page, itemsPerPage, */ ( err, users ) => {

        if(err) return res.status(404).send({Error:'Error a la ahora de solicitar usuarios'});

        if(users) {
            res.status(200).send({
                //page: Math.ceil( total/ itemsPerPage),
                users
            
            });


        }else{
            res.status(404).send({Error: 'No hay usuarios'});
        }
    })
}


//Editar usuario.....

function updateUser( req, res ){

    let  id  = req.params.id;
    let update = req.body;
    console.log('update:',update)
                           //esto aqui fue actualizado para que los admin puedan actualizar...
    if(id !== req.user.Sub && req.user.role === 'Role_user'){
        console.log('si esta entrando',req.user.role)
        return res.status(200).send({Mensaje:'Usted no tiene permiso para actualizar este usuario'})
    }

    delete update.password;

    User.findByIdAndUpdate(id,update,{new:true}).exec( (err, user) => {
 
        if(err) return res.status(500).send({Messaje:'Error en el servidor, no se pudo actualizar sus datos'});

        if(user){
            res.status(200).send({user})
            console.log('user',user)
        }
    });

    

}



   // este metodo es para agregar una fecha cada vez que inicie session un admin....
async function updateUser02( req, res,next ){

    let  id  = req.params.id;
    let update = req.body;
                           //esto aqui fue actualizado para que los admin puedan actualizar...
    if(id !== req.user.Sub && req.user.role === 'Role_user'){
       
        return res.status(200).send({Mensaje:'Usted no tiene permiso para actualizar este usuario'})
    }

    let g = update.fecha_entrada;

    delete update.password;
   
 await User.findByIdAndUpdate(id,{ $push: {'fecha_entrada': g} },{ strict: false });
   next()
   

//   aqui esta pasando algo a la hora que salimos del login no se puede logiar otro renemos que ver que es lo que pasa......

}
  //esto es para actualizar las salidas de los administradores
async function updateUser03( req, res,next ){

    let  id  = req.params.id;
    let update = req.body;
                           //esto aqui fue actualizado para que los admin puedan actualizar...
    if(id !== req.user.Sub && req.user.role === 'Role_user'){
       
        return res.status(200).send({Mensaje:'Usted no tiene permiso para actualizar este usuario'})
    }

    let g = update.fecha_salida;

    delete update.password;

  await  User.findByIdAndUpdate(id,{ $push: {'fecha_salida': g} },{ strict: false });
    next() 
}





//Eliminar usuario....

function deleteUser( req, res){

    let id = req.params.id;

    if(id !== req.user.Sub){
        return res.status(404).send({Mensaje:'Lo sentimos, usted no esta autorizado para  Eliminar este usuario'})
    }

    User.findByIdAndDelete({_id: id}).exec( async (errp, userdelete) => {
         
        if(errp){
        
            return res.status(500).send({Mensaje:'Error en el servidor a la hora de eliminar el usuario'});
        } 

        if(userdelete){

            if(userdelete.imagen.public_id){
 
                await deleteImagenCloudinary(response.imagen.public_id)
    
            }

            return res.status(200).send({Mensaje:'Usuario eliminado'})
        }else{
            return res.status(404).send({Mensaje:'Error el mensaje no se pudo eliminar'})
        }



    })
  
}


function getByEmail( req,res ) {

    let params = req.body;
    
    let email = params.email;
   

    //////////////////////////////////////////////////////////////////////////////
    
    
    
    User.findOne({ email: email.toLowerCase()}, (err, user) => {   
        
       
        if(err) return res.status(500).send({Error: 'Error en la pericion'});

        
        if(user){
            // aqui estamos comparando la contraseña....
           return res.status(200).send({user})

        }else{
            return res.status(404).send({Mensaje:'El usuario no esta registrado'})
        }

    });


}








//subir una imagen 
async function uploadImagen(req, res ){

    let userId = req.params.id;
      
    if(req.user.role === 'Role_user'){
         return res.status(500).send({Mensaje:'Este usuario no puede subir esta imagen'});
    }

 
    
    if(req.files?.imagen){

        var imgg = {
            public_id: "",
            secure_id: ""
        } 

        try {
            //listing messages in users mailbox                            
            var imgRespon = await uploadFileImgCloudinary(req.files.imagen.tempFilePath)
              
               imgg = {
                public_id: imgRespon.public_id,
                secure_url: imgRespon.secure_url
            } 
            
            } catch (err) {
              console.log(err);
            }

        await fs.unlink(req.files.imagen.tempFilePath)

        if( imgg  ){


               //Actualizar documento del usuario que esta subiendo la imagen....

               try {
                   await User.findByIdAndUpdate(userId, {imagen: {public_id: imgRespon.public_id, secure_url: imgRespon.secure_url}}, {new:true})  //(err, response ) => {
                       .then((response) => res.status(200).send(response))
                       .catch((err) => res.status(500).send({ Mensaje:'Error con la imagen'}));
                
               } catch (error) {
                   console.log(error)
               }
          
            }else{
           return  removeFileUpload(res, req.files.imagen.tempFilePath, 'No se puede subir esta imagen');
           // return res.status(500).send({Mensaje:'Error: formato erróneo'});
        }
       
    }

    
}

//subir una imagen 
function uploadImagen02(req, res ){

    let email = req.params.email;

    
    if(req.files){

        var file_path = req.files.imagen.path;

        var file = file_path.split('\\');

        var imagUrl = file[file.length -1];

        var formtoImg = imagUrl.split('.');

        var formato = formtoImg[formtoImg.length -1];

        if( formato == 'jpg' || formato == 'jpg'  || formato == 'png'  || formato == 'GIF' ||
            formato == 'PNG' || formato == 'jpeg' || formato == 'JPEG' || formato == 'gif'  ){

               

               //Actualizar documento del usuario que esta subiendo la imagen....
              //  {correo_emisor: email.toLowerCase()}
               Chat.findOneAndUpdate({$or:[{correo_emisor:email.toLowerCase()},{correo_recep:email.toLowerCase()}]}, {imagen: imagUrl}, {new:true}, (err, response ) => {
                   
                console.log('Error',err)
                 if(err) return res.status(500).send({Mensaje:'Error con la imagenw'});

                 if(response){

                    console.log(response)

                     return res.status(200).send({response});

                 }else{

                
                     return removeFileUpload( res, file_path, 'No exciste la imagen' );
                 }

               })
                
            }else{
           return  removeFileUpload(res, file_path, 'No se puede subir esta imagen');
           // return res.status(500).send({Mensaje:'Error: formato erróneo'});
        }
       
    }

    
}

//subir una imagen 
async function uploadImagenChatNew(req, res ){

    let userId = req.params.id;

    var imgg = {
        public_id: "",
        secure_id: ""
    } 
   
    
    if(req.files?.imagen){
        
        try {
            //listing messages in users mailbox                            
            var imgRespon = await uploadFileImgCloudinary(req.files.imagen.tempFilePath)
              
               imgg = {
                public_id: imgRespon.public_id,
                secure_url: imgRespon.secure_url
            } 
            
            } catch (err) {
              console.log(err);
            }
            await fs.unlink(req.files.imagen.tempFilePath)
        
        if( imgg ){
            
            try {
                await Chat.findByIdAndUpdate(userId, {imagen: {public_id: imgRespon.public_id, secure_url: imgRespon.secure_url}}, {new:true})  //(err, response ) => {
                    .then((response) => res.status(200).send(response))
                    .catch((err) => res.status(500).send({ Mensaje:'Error con la imagen'}));
             
            } catch (error) {
                console.log(error)
            }

               //Actualizar documento del usuario que esta subiendo la imagen....

            //    Chat.findByIdAndUpdate(userId, {imagen: imagUrl}, {new:true}, (err, response ) => {
                   
            //      if(err) return res.status(500).send({Mensaje:'Error con la imagen'});

            //      if(response){

            //          return res.status(200).send({response});

            //      }else{
            //          return removeFileUpload( res, file_path, 'No exciste la imagen' );
            //      }

            //    })
                
            }else{
           return  removeFileUpload(res, req.files.imagen.tempFilePath, 'No se puede subir esta imagen');
           // return res.status(500).send({Mensaje:'Error: formato erróneo'});
        }
       
    }

    
}




async function uploadImagen02New(req, res ){

    
    let email = req.params.email;
    let param = req.body;

    console.log('files',req.files)
    
    if(req.files?.image){

        const imgRespon = await uploadFileImgCloudinary(req.files.image.tempFilePath)
        
        await fs.unlink(req.files.image.tempFilePath)
        var file_path = req.files.imagen.path;

        var file = file_path.split('\\');

        var imagUrl = file[file.length -1];

        var formtoImg = imagUrl.split('.');

        var formato = formtoImg[formtoImg.length -1];

        if( formato == 'jpg' || formato == 'jpg'  || formato == 'png'  || formato == 'GIF' ||
            formato == 'PNG' || formato == 'jpeg' || formato == 'JPEG' || formato == 'gif'  ){

               

               //Actualizar documento del usuario que esta subiendo la imagen....
              //  {correo_emisor: email.toLowerCase()}
              let savemsg =  await new Chat({
                msg:param.ms.texto,
                correo_emisor:param.emisor,
                correo_recep:param.receptor,
                imagen:{
                    public_id: imgRespon.public_id,
                    secure_id: imgRespon.secure_url
                } 
                //imagUrl,
                //chat_room:
            })
        
                      
            savemsg.save((err,response)=>{
                  if(err) return res.status(400).send({Error:'Error'})

                  if(response){
                    return res.status(200).send({response})


                  }else{
                    return  removeFileUpload(res, file_path, 'No se puede subir esta imagen');
                    
                  }
            });
        
                
            }else{
           return  removeFileUpload(res, file_path, 'No se puede subir esta imagen');
           // return res.status(500).send({Mensaje:'Error: formato erróneo'});
        }
       
    }

    
}


//esto aqui nos permite no tener imagenes no deseadas cuardada...
function removeFileUpload(res, file_path, mensaje){
     
      fs.unlink(file_path, (err) => {

        return res.status(404).send({Mensaje:'Error con la imagen'})

      })
       
}


//Obtener imagen....
function getImg( req, res ){

    let Imagen = req.params.imagenpath;
    let uploadImagen = './uploads/user/'+Imagen;

    fs.stat(uploadImagen,(err, exist) => {

        if(exist){
            res.sendFile(path.resolve(uploadImagen));

        }else{
            res.status(404).send({Mensaje:'Error: La imagen no exciste'});
        }
    });
    
}



///chat 
async function saveChat ( req, res ) {

    let param = req.body;
   

   console.log('ppp',param)

    let savemsg =  await new Chat({
        msg:param.ms.texto,
        correo_emisor:param.emisor,
        correo_recep:param.receptor,
        imagen:param.imagen,
        //chat_room:
    })

              
    savemsg.save((err,response) =>{
        if(err) return res.status(400).send({Error:'Error save'})

        if(response){
            return res.status(200).send({response})
        }
    });

    
}

function getChatByEmail( req,res ) {

    let param = req.params;
    
    let email = param.email;
   
    
    Chat.findOne({ $or:[{correo_emisor:email.toLowerCase()},{correo_recep:email.toLowerCase()}]}, (err, user) => {   
        
       
        if(err) return res.status(500).send({Error: 'Error en la pericion'});

        
        if(user){
            // aqui estamos comparando la contraseña....
           return res.status(200).send({user})

        }else{
            return res.status(200).send({Mensaje:'El usuario no esta registrado'})
        }

    });


}

function getBothChat( req,res ) {

    let param = req.params;
    let email = param.email;

    let paramRecep = req.body;
    let EmailRecep = paramRecep.correo_recep;

    Chat.find({ $and:[{correo_emisor:email.toLowerCase()},{correo_recep:EmailRecep.toLowerCase()}]}, (err, chat) => {   
        
       
        if(err) return res.status(500).send({Error: 'Error en la pericion'});

        
        if(chat){
            // aqui estamos comparando la contraseña....
           return res.status(200).send({chat})

        }else{
            return res.status(200).send({Mensaje:'No hay conversacion'})
        }

    });


}

   // este metodo es para agregar las calificaciones a los doctores....
   async function calificandoDoct( req, res ){

    let  id  = req.params.id;
    let update = req.body;

                           //esto aqui fue actualizado para que los admin puedan actualizar...
    // if(id !== req.user.Sub && req.user.role === 'Role_user'){
       
    //     return res.status(200).send({Mensaje:'Usted no tiene permiso para actualizar este usuario'})
    // }

    let calificacion = update.calificacion;

    delete update.password;

  await  User.findByIdAndUpdate(id,{ $push: {'calificacion': update} },{ strict: false });

}

 // este metodo es para agregar las calificaciones a los doctores....
 async function calificar( req, res ){

    let  id  = req.params.id;
   
   await User.findByIdAndUpdate(id,{'calificar': true},{ new: true }).exec();

}


//cambiar contraseña...
function cambiarContrasena( req, res ){

    let  id  = req.params.id;
    let update = req.body;
    console.log('update:',update)
    console.log('Sub -/*',req.user) 
                           //esto aqui fue actualizado para que los admin puedan actualizar...
    if(id !== req.user.Sub && req.user.role === 'Role_user'){
        console.log('si esta entrando',req.user.role)
        return res.status(200).send({Mensaje:'Usted no tiene permiso para actualizar este usuario'})
    }

  //  delete update.password;

  bcrypt.hash( update.password, 8, (err, hash) => {
                    
    update.password = hash;
    
    User.findByIdAndUpdate(id,update,{new:true}).exec( (err, user) => {
    
        if(err) return res.status(500).send({Messaje:'Error en el servidor, no se pudo actualizar sus datos'});
    
        if(user){
            res.status(200).send({user})
            console.log('user',user)
        }
    });
    
});


    

}

//crear notificaciones...                                                              ****************************************
function crearNotificacion( req, res){


    let nota  = new  Notificacion();
 
    let params = req.body;

    var time = new Date();
    var hour = time.getHours();
    console.log('h',hour)
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var temp = '' + ((hour > 12) ? hour - 16 : hour);

  
        if (hour == 0)
          temp = '12';
        temp += ((minute < 10) ? ':0' : ':') + minute;
        temp += ((second < 10) ? ':0' : ':') + second;
        temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  
    let   fechaf = time.toLocaleDateString("es-MX",{ weekday:'long', day:'numeric', month:'long', year:'numeric' });

   nota.titulopri = params.titulopri; 
   nota.tituloseg = params.tituloseg;
   nota.imagen = null;
   nota.visto = false;
   nota.nota =params.nota;
   nota.fecha = fechaf +', '+ temp;
   
   nota.save((err, response) =>{

    console.log(err)
    if(err) return res.status(200).send({Mensaje:'Error al crear notificacion...'})

    if(response){
      
        return res.status(200).send({response})
    }

   });
}

function updateNota( req, res ){
    let idparams = req.params.id;

    let update = req.body;
    Notificacion.findByIdAndUpdate(idparams,update,{new:true}).exec((err, response) => {

        if(err) return res.status(200).send({Mensaje:'Error, no se pudo actualizar la nota...'});

        return res.status(200).send({response})
    })

}

async function deleteNote( req, res ){

    let idparams = req.params.id;

    // Notificacion.find({_id:idparams}).exec( async (err,response) =>{

    //     console.log('resp imagen',response)

    //     if(response.imagen.imagen.public_id){
 
    //         await deleteImagenCloudinary(response.imagen.imagen.public_id)

    //     }

    // })

  
        Notificacion.findByIdAndDelete({_id:idparams}).exec( async (err, response) => {
            if(err) return res.status(200).send({Mensaje:'Error, no se pudo actualizar la nota...'});
               let mensaje = ''
            if(response){

                console.log('deletee',response)
                if(response.imagen.public_id){
 
                    await deleteImagenCloudinary(response.imagen.public_id)
        
                }
                mensaje = 'Se elimino la nota exitosamente!'
            }else{
                mensaje = 'Nota no existente'
            }
            return res.status(200).send({mensaje})
        })
        
  
 

}

async function imagenNote( req, res){

    let userId = req.params.id;
      ///////////////////////////////////////////////////
 

      var imgg = {
        public_id: "",
        secure_id: ""
    } 
   
    
    if(req.files?.imagen){
      

           var file_path = req.files.imagen.name;
           var file = file_path.split('.');
           var imagformat = file[file.length -1];
           console.log('imagformat',imagformat)
           console.log('name',req.files.imagen)

        if( imagformat == 'jpg' || imagformat == 'JPG'  || imagformat == 'png'  || imagformat == 'GIF' ||
        imagformat == 'PNG' || imagformat == 'jpeg' || imagformat == 'JPEG' || imagformat == 'gif' || imagformat == 'jfif' || imagformat == 'jfi' || imagformat == 'jif'){

         try {
             //listing messages in users mailbox                            
             var imgRespon = await uploadFileImgCloudinary(req.files.imagen.tempFilePath)
             console.log('walala',imgRespon)
                




             imgg = {
                 public_id: imgRespon.public_id,
                 secure_url: imgRespon.secure_url
                } 
            
                
                
                
            } catch (err) {
                console.log(err);
            }
            await fs.unlink(req.files.imagen.tempFilePath)
            
            if( imgg ){
                
                try {
                    await Notificacion.findByIdAndUpdate(userId, {imagen: {public_id: imgRespon.public_id, secure_url: imgRespon.secure_url}}, {new:true})  
                    .then((response) => res.status(200).send(response))
                    .catch((err) => res.status(500).send({ Mensaje:'Error con la imagen'}));
                    
                } catch (error) {
                    console.log(error)
                }
                
                
     
                        
               }else{
                  return res.status(200).send({error:'El formato de la imagen no es valido.'})
               }
            }else{
         //  return  removeFileUpload(res, file_path, 'No se puede subir esta imagen');
            return res.status(500).send({Mensaje:'Error: formato erróneo'});
        }
       
    }else{
        return res.status(200).send({error:'El formato de la imagen no es valido.'})
    }
}

function obtenerTodasNotificacion( req, res ){

    Notificacion.find({}).sort({'_id':-1}).exec((err,response) => {

        if(err) return res.status(200).send({Mensaje:'Error, no se pudo actualizar la nota...'});

        return res.status(200).send({response})
    })
}

function obtenerUnoNota( req, res ){

    let paramsId = req.params.id;

    Notificacion.findById(paramsId).exec((err,response) => {

        if(err) return res.status(200).send({Mensaje:'Error, no se pudo actualizar la nota...'});

        return res.status(200).send({response})
    })
}


async function updateAllNote(req,res, next){    

    let paramsBody = req.body;
    
    
    console.log('dd',paramsBody)
    
    let users = []
    
    //users = await User.find() // User is Schema
    
    try {
        console.log(req.timedout)
        
               
        await  User.updateMany({},paramsBody,{multi: true});
         //   req.setTimeout((4 * 60 * 1000) + 1);
            // req.socket.removeAllListeners('timeout'); // This is the work around
            // req.socket.once('timeout', () => {
            //     req.timedout = true;
            //     res.status(504).send('Timeout');
            // });

           
            
            
            
            
            
            
        } catch (error) {
            console.log(error)
        }
        next()  
     
    // users.forEach( async (val)=>{
        
    //     try{
    //       await  User.findByIdAndUpdate(val._id, paramsBody, {new:true})

    //     }catch(err){
    //         console.log(err)
    //     }
    // })

}


async function updateAllNoteWithId(req,res){

    let paramsBody = req.body;
  
    let paraId = req.params.id;

    User.findByIdAndUpdate(paraId, paramsBody, {new:true}).exec((err,response) =>{
        if(err) return res.stutus(400).send({Error:"Error: No hay imagen"});
        if(response){
            
            return res.status(200).send({response});
        }else{
        return res.status(404).send({Error:"No se pudo actualizar los datos"})

        }
    })

}

function getImgFromChat(req, res){

    let email = req.params.email;
    
    chatModel.find({$or:[
        {correo_emisor:email},
        {correo_recep:email}
    ]
}).exec((err,response)=>{
   
    if(err) return res.stutus(400).send({Error:"Error: No hay imagen"});

    if(response){
        console.log(response)
        return res.status(200).send({response});
    }else{
        return res.status(404).send({Error:"No hay imagen"})
    }
})



}




module.exports =  {

    home,
    saveUser,
    loginUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    uploadImagen,
    getImg,
    updateUser02,
    getByEmail,
    updateUser03,
    uploadImagen02,
    saveChat,
    getChatByEmail,
    getBothChat,
    calificandoDoct,
    calificar,
    cambiarContrasena,
    crearNotificacion,
    updateNota,
    deleteNote,
    imagenNote,
    obtenerTodasNotificacion,
    obtenerUnoNota,
    updateAllNote,
    updateAllNoteWithId,
    getImgFromChat,
    uploadImagen02New,
    uploadImagenChatNew

}