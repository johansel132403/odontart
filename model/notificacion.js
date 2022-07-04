
let mongoose = require('mongoose');

let Schema = mongoose.Schema;



let Notificaciones = Schema({
    titulopri: String,
    tituloseg:String,
    nota:String,
    imagen:{
        public_id: String,
        secure_url: String
      },
    visto:Boolean,
    fecha:String
  
});

module.exports = mongoose.model('notificacion',Notificaciones);

