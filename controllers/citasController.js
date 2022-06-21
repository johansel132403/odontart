
let Citas = require('../model/citas.model');

let moment = require('moment');

var mongoosePaginate = require('mongoose-pagination');


let User = require('../model/user.model')



// fecha: String,
// doctor:String,
// description:String,
// IdUser: { type: Schema.ObjectId, ref: 'User'  }




// crear una cita...

function crearCitas(  req, res ){


    let idUser = req.params.id;
    let params = req.body;
    let ct = new Citas();

    // if(idUser !== req.user.Sub && req.user.role === 'Role_user'){
    //     return res.status(500).send({Error:'Usted no puede hacer una cita con este usuario'})
    // }

    console.log(params.fecha)

    if( params.fecha !=  'Invalid Date' ){

       // moment.locale('es');
     //   ct.fecha       = moment().format('LLLL');
        ct.fecha       = params.fecha;
        ct.doctor      = params.doctor;
        ct.descripcion = params.descripcion;
        ct.IdUser      = idUser;
        ct.visto       = false;


        ct.save(( err, savecitas ) => {
            if(err) return res.status(500).send({Mensaje:'Error al crear una cita'});

            if(savecitas){

              

                return res.status(200).send({savecitas})

            }else{
                return res.status(404).send({Mensaje:'Error: no se pudo hacer la cita'});
            }
        })
    }else{
        return res.status(404).send({Mensaje:'Tiene que llenar el campo de la fecha'});
    }




}



//obtener una cita por el ID de la cita...

function getOneCita( req, res ){

    let idPamars = req.params.id;

    Citas.findById(idPamars, (err, citaa) => {

        if(err) return res.status(500).send({Mensaje:'Error al buscar una cita'});

        if(citaa){
            return res.status(200).send({citaa});
        }else{
            return res.status(404).send({Mensaje:'No hay citas'});
        }
    })

}


//obtener todas las citas 

function getAllCitas( req, res ){

    let page = 1;

    let paramsPage = req.params.page;

    if( paramsPage >= 1 ){
        page = paramsPage;
    }

    let itemsPerPage = 5;

    Citas.find().sort({_id: -1}).exec(( err, citas ) => {
       
        if(err) return res.status(500).send({Mensaje:'Error: no se puede obtener las citas'});

        if(citas){

            return res.status(200).send({
                
               // page: Math.ceil(total / itemsPerPage ),
                citas

            
            })

        }else{

            return res.status(404).send({Mensaje:'Lo sentimos, no hay citas'});
        }
    })
}


//obtener todas las citas de un User...
function getCitaOfUser( req, res ){

    let idParams= req.params.id;


    console.log(idParams)


    // {IdUser:idParams}
    Citas.find({IdUser:idParams}).sort({_id: -1}).populate("IdUser").exec((err, user) => {

        console.log(user)
         
        if(err) return res.status(500).send({Error: 'Error no se puede cargar los usuarios con sus citas'});

        if(user){

            return res.status(200).send({citas:user});

        }else{
            return res.status(404).send({Mensaje: 'Error: no hay usuarios con citas'})
        }
    })





}


//obtener todas las citas con su  User...
function getAllCitaWithUser( req, res ){

    Citas.find().sort({_id: -1}).populate("IdUser").exec((err, user) => {

        console.log(user)
         
        if(err) return res.status(500).send({Error: 'Error no se puede cargar los usuarios con sus citas'});

        if(user){

            return res.status(200).send({citas:user});

        }else{
            return res.status(404).send({Mensaje: 'Error: no hay usuarios con citas'})
        }
    })





}

//obtener UNA cita con su user.....
function getOnecitaAndUser( req, res ){

    let paramsId = req.params.id;

   

    Citas.findById(paramsId).populate("IdUser").exec((err,response)=>{

      

        if(err) return res.status(500).send({Error: 'Error no se puede cargar la citas'});

        if(response){

            return res.status(200).send({cita:response});

        }else{
            return res.status(404).send({Mensaje: 'Error: no hay usuarios con citas'})
        }
        
    })

}

//Actaulizar citas....
function updateCita( req, res ){
 
    let paramsId = req.params.id;

    let paramsBody = req.body;


    Citas.findById(paramsId).exec((err,cita) => {

        if(err) return res.status(500).send({Error:'No se encontro la cita'});

        if(cita){

            let iduser = JSON.stringify(cita.IdUser).replace(/["]+/g, '');
           
            if(iduser != req.user.Sub && req.user.role != 'Role_admin' && req.user.role != 'Role_subadmin'){
              
                return res.status(500).send({Error:'Usted no tiene permiso para actualizar este usuario'});

            }else{
                
                Citas.findByIdAndUpdate(paramsId, paramsBody,{new:true}, (err, cita) => { 

                    if(err) return res.status(500).send({Mensaje:'Error: No se puede actualizar la cita'});
            
                    if( cita ) {
                        
                        return res.status(200).send({ cita })
            
                    }else{
                        return res.status(404).send({Mensaje:'Error: No hay actualizacion'})
                    }
                })
               
            }

        
        }else{
            return res.status(404).send({Mensaje:'La cita no se puede actualizar porque no existe'})
        }
     });


}


//borrar una cita...

function deletecita( req, res ){

    let paramsId = req.params.id;

     /// me quede aqui lo que estoy haciendo aqui es para que una persona no pueda eliminar una cita que no sea de el....
     Citas.findById(paramsId).exec((err,cita) => {

        if(err) return res.status(500).send({Error:'No se encontro la cita'});

        if(cita){

            let iduser = JSON.stringify(cita.IdUser).replace(/["]+/g, '');
           
            if(iduser != req.user.Sub && req.user.role != 'Role_admin'){
                console.log('entro')
                return res.status(500).send({Error:'Usted no puede eliminar este usuario'})
            }else{
                
                Citas.find({_id:paramsId}).remove(( err, delet ) => {
                    if(err) return res.status(500).send({Error:'Error: no se puede eliminar la cita'});
            
                   
                    if(delet.deletedCount >= 1){
                        return  res.status(200).send({Mensaje:'La cita se elimino correctamente'});

                    }else{
                        return  res.status(404).send({Mensaje:'No se puede borrar lo que no existe'})
                    } 
                })
            }

        
        }else{
            return res.status(404).send({Mensaje:'Error: La cita no existe'})
        }
     });


}










module.exports = {
    crearCitas,
    getOneCita,
    getAllCitas,
    getCitaOfUser,
    updateCita,
    deletecita,
    getAllCitaWithUser,
    getOnecitaAndUser
 
}