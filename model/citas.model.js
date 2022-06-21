
let mongoose = require('mongoose');

let Schema = mongoose.Schema;



let citasSchema = Schema({
    fecha: String,
    doctor:String,
    descripcion:String,
    visto:Boolean,
    IdUser: { type: Schema.ObjectId, ref: 'user'  }
});

module.exports = mongoose.model('cita',citasSchema);