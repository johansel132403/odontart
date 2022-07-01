

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let UserSchema = Schema({
     nombre: String,
     apellido:String,
     edad:String,
     direccion:String,
   //  sexo:String,
     email:String,
     password: String,
     role:String,
     telefono:String,
     citas:String,
     online: Boolean,
     adminUser:String,
     imagen:{
      public_id: String,
      secure_url: String

     },
     activo: Boolean,
     visto: Boolean,
     notificacionView:Boolean,
     calificar:Boolean,
     calificacion:[Object],
     fecha_entrada:[String],
     fecha_salida:[String]
});

module.exports = mongoose.model('user', UserSchema)

