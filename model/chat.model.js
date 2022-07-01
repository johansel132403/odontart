
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// ms: this.mensaje,
// nombre:this.receptorr.nombre,
// emisor: this.identity.email,
// receptor: this.receptorr.receptor
// }


let chatSchema = Schema({
    msg: String,
    correo_emisor:String,
    correo_recep:String,
    chatroom: String,
    imagen:{
      public_id: String,
      secure_url: String
    },
   // IdUserChat: { type: Schema.ObjectId, ref: 'user'  },
    create_at:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chat',chatSchema);