

let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let adminSchema = Schema({
    nombre: String,
    email:String,
    password: String,
    citas :String,
    iduser: { type: Schema.ObjectId, ref: 'User' },
})


module.exports = mongoose.model('admin', adminSchema );