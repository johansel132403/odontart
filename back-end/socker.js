// este metodo es sockeIo y lo tenemos aislado...

//const { suppressDeprecationWarnings } = require("moment");
 

const Chat = require('./model/chat.model');
const User = require('./model/user.model');

const { v4: uuidv4 } = require("uuid");
module.exports = function(io) {
    
    
    UserOnId = new Array();
    IdsOnUser = new Array();
    
    userOnIdd = new Array();
    idOnUserr = new Array();
    var idAdmin = null;
    var value = '';

    io.on('connection',(socket) => {





                   
        id_socket = socket.id;
       


                   //aqui lo que hacemos es que actualizamos la base de dato de administrador,cada vez que el esta chateando con un user
                   //ese correo de ese usuario se le va a pasar a los datos del administrador, esto nos permite que a la hora de una persona querer 
                   //escribirle al administradolo si el admin esta chateando con otra persona, que los mensaje de la persona que le quiera escribir 
                   //no pueda ya quee el admin esta en otro chat, si no se hiciera asi cada vez que una persona escribiera ese mensaje apareceria en la chat en que este el admin
                   //no importa si es con otra persona,esto llega a pasar porque todos los usuarios tienen el mismo correo del admin y en este caso en el socket lo estamos registrando con el correo
        socket.on('onlineEmail', async (data)=>{

     
               if(data.idAdmin){

               
                let update = await User.findByIdAndUpdate(data.idAdmin,{'adminUser':data.userEmail},{new:true})
                 
                //  if(update){
                //      socket.emit('changeDataAdmin', dato = true )
                //  }
              }


        // socket.on('disconnect', async () =>{

        //         //cada vez que una persona se conecte... va actualizar la base de dato y va a gregar el valor (online) para mostrar que el valor esta en linea
        //  if(data.idAdmin){
             
        //      socket.emit('yess', dato=false)
             
        //      let update = await User.findByIdAndUpdate(data.idAdmin,{'adminUser':null},{new:true})
              
         
        //    }


        //      socket.emit('update03', dato = false)
            
        //  })

        });


    
       
        // let element = true;
        // socket.broadcast.emit('online', element);

        //metodo para saber en el admin quien esta conectado...
        socket.on('admin-conenct', async(data) => {

           
            // if(data.role === 'Role_admin'){
             

            //     console.log('si entro')
            //     let update = await User.findByIdAndUpdate(data.id,{'online':true},{new:true})
                 
            //      if(update){
            //          socket.emit('online', dato = true )
            //      }
            //   }

           
            socket.emit('yess',dato = true)

            console.log('newData',data)
            //en si este metodo no lo estamos usando ya que era para ver los usuario que esten activo, para esto tenemos que usar change stream...
            //cada vez que una persona se conecte... va actualizar la base de dato y va a gregar el valor (online) para mostrar que el valor esta en linea
            if(data.role != 'Role_admin' && data.role != 'Role_subadmin'){
                
                   
                    let update = await User.findByIdAndUpdate(data.id,{'online':true},{new:true})
                     
                     if(update){
                         socket.emit('online', dato = true )
                     }
                  }
                  
                  socket.on('update',update =>{
                      value = update;
                     // console.log('actualizacion',update)
                    })
                   
                    socket.emit('update02',value)


            
            //   usuario = data.emisor;
            //   id_sock_io = socket.id;

            //   console.log(id_sock_io)
              

            //   userOnIdd[id_sock_io] = usuario;

            //   console.log(userOnIdd)


            //   if(idOnUserr[usuario] == null){
            //       idOnUserr[usuario] = new Array();
                  
            //   }

            //   idOnUserr[ usuario ].push(id_sock_io);
  
             
                  
            //     //   let    id_online = IdsOnUser['o@hotmail.com'];
            //     //      console.log('yes',id_online)

            //     console.log('----------------usuarios por id-------------')
            //     console.log(userOnIdd)
            //     console.log('---------------Ids por usuarios-------------')
            //     console.log(idOnUserr)
            //     console.log('---------------cantidad de users online------')
            //     console.log(Object.keys(idOnUserr).length) // me quede por aqui 
            
                
            //     // id_online = idOnUserr['o@hotmail.com'];

            //     // idAdmin = id_online;
            //     // console.log(id_online)
              


            //     socket.on('send online', async(data) => {   

            //         let user = new User
            //         //este codigo es para ver si hay gente en linea...
                    
            //         //data.emisor = este es el correo del usuario que vamos a buscar
            //         let bd = await User.find({'email':data.emisor})
        
            //         online = true;
            //         bd = Object.assign(bd,{online})
                   
        
        
            //         /**//////////////////////////////////////////////// */
            //                                                                 // new codigo......
            //         id_online = idOnUserr[data.nombre];
            //     //    //console.log('sii',id_online.length)
            //               let element = true;
            //                      //    console.log('leng',id_online.length)
            //           //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
            //            if( id_online  && id_online != undefined  ){
            //                for (let i = 0; i < id_online.length; i++) {
            //                       console.log('p',id_online[i])
            //                 io.to(id_online[i]).emit('online',element)
                          
                            
                           
            //                }
        
            //            }              
        
        
            //     })

                       // este metodo no esta en uso .....
            socket.on('disconnect', async () =>{

                   //cada vez que una persona se conecte... va actualizar la base de dato y va a gregar el valor (online) para mostrar que el valor esta en linea
            if(data.role != 'Role_admin' && data.role != 'Role_subadmin'){
                
                socket.emit('yess', dato=false)
                
                let update = await User.findByIdAndUpdate(data.id,{'online':false},{new:true})
                 
            
              }


                socket.emit('update03', dato = false)
                console.log('se esta saliendo del socket')
               
            })


              
            })

        // socket.on('bd_online', async()=>{

        // })    

        
        /*/////*////////////////////////////////////////////////////////,-----.-.-------------------------.>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        //Metodo del chat.....
        socket.on('new user', async(data,receptor)=> {
          
           
    
            usuario = data.emisor;
            //id_socket = socket.id;
           // console.log(id_socket) 
           


              //cada vez que una persona se conecte... va actualizar la base de dato y va a gregar el valor (online) para mostrar que el valor esta en linea
            //  if(data.role != 'Role_admin'){
    
            //    let update = await User.findByIdAndUpdate(data.id,{'online':true},{new:true})
    
            //  }

             // esto aqui es para ver si esta en linea
            
                                             //base de datos
                            // let bd_message = await Chat.find({$in:[

                            //     {correo_emisor: data.emisor},
                            //     {correo_recep:receptor }
                            // ]});

                // if(data.role === 'Role_user'){
                //     let element = true;
                //     socket.to().emit('online', element);
        
                // }

                            

                                            //aqui lo que estamos haciendo es guardando en la base de dato
                                let bd_message = await Chat.find({
                                    "correo_emisor": { "$in": [data.emisor , receptor ]},
                                    "correo_recep": { "$in": [data.emisor , receptor]}
                                });
                                
                                //aqui estamos devolviendo los mensajes guardados de la db....
                                socket.emit('load old msgs',bd_message);

            // UserOnId  esta declarado como un array
           //  IdsOnUser //      //      //  //  //

           // id_user = socket.id;
            
           //guardando user por Id
            UserOnId[ id_socket ] = usuario;

            //guardando id por user
         //   IdsOnUser[ usuario ] = new Array();

          
            if(IdsOnUser[usuario] == null){
                IdsOnUser[ usuario ] = new Array();
               
            }   
            
            

           
            for(let i =0; i< IdsOnUser[usuario].length; i++){ 
                
              
                if(IdsOnUser[usuario][i] === id_socket){
                  //  IdsOnUser[usuario].splice(i,1)
                 
                    
                    // for(let p = 0; p < UserOnId[id_socket][i].length; p++ ){
                        
                        //     console.log('PPPP',UserOnId[id_socket][i][p])
                        //     if(IdsOnUser[UserOnId][i][p] === id_socket){
                            //         console.log('si entreoooo', p ,id_socket)
                            //         // id_socket = '';
                    //         console.log(UserOnId[id_socket])
                    //         UserOnId[id_socket][i].splice(p,1);
                    
                    //     }
                    // }
                }
            }
            
            IdsOnUser[usuario].push(id_socket)
            

                console.log('----------------usuarios por id-------------')
                console.log(UserOnId)
                console.log('---------------Ids por usuarios-------------')
                console.log(IdsOnUser)
                console.log('---------------cantidad de users onlinee------')
                console.log(Object.keys(IdsOnUser).length) // me quede por aqui 

                // IdsOnUser.forEach(element => {
                //     console.log('element',element)
                //     if(element === 'o@hotmail.com'){            //esto se puede borrar
                //         console.log('si haha')
                //         for(let i =0; i<= element.length; i++){
                //             if(element[i] === element[i + 1]){
                //                 IdsOnUser.splice(element[i],1)
                //             }
                //         }
                //     }
                // });
                
              

                // id_online = IdsOnUser[idAdmin];
                // //    //console.log('sii',id_online.length)
                // //    console.log('leng',id_online.length)
                // //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                
                
                // if( data.pass != undefined && data.pass == 'true' ){
                //            var element = true;
                           
                //            for (let i = 0; i < id_online.length; i++) {
                //                   console.log('p',id_online[i])
                //             io.to(id_online[i]).emit('online023',element)
                          
                    /**//////////////////////////////////////////////////////////////////////// */   
                    
                    /**//////////////////////////////////////////////////////////////////////// */
                           
                //            }
        
                //        }  

 /*/*eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee*/ // esto son 2 codigo diferente
        //     if( data in user){
        //         console.log(data)
        //     }{

        //         socket.nickname = data;
        //         // user.push(socket.user)
        //          user[socket.nickname] = socket;in-conenct
        //         io.sockets.emit('user', Object.keys(user))
                
        //     //console.log(Object.keys(user))
        //     }
           
        // })

               ///aqui estamos enviando los mensajes recividos
        socket.on('send message', async(data) => { 


            
            console.log('activo',data)
       
            
            let dato02 = {
                msg: data.ms.texto,
                nombre: data.nombre,
                correo_emisor: data.emisor,
                imagen: data.imagen,
               // receptor:data.receptor
                receptor:data.receptor
                
            }
            //esto es lo que no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
            //el admin este hablando actualmente......
            if(data.role == 'admin'){    
                
                let update = await User.find({email: data.receptor })

              

                if(update[0].adminUser === data.emisor){  
                //  if(data.role == 'admin'){  
                    
                    //  console.log(update)
                       
                    /**//////////////////////////////////////////////// */
                    // new codigo......
                    id_online = IdsOnUser[data.nombre];
                   
                   //    //console.log('sii',id_online.length)
                             let element = true;
                                    //    console.log('leng',id_online.length)
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                   
                               io.to(id_online[i]).emit('new message',{msg:dato02})
                                     
                              }
           
                          }              
                 }   // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
            }else if(data.role == null){


                let update = await User.find({email: data.receptor })
    
              

                  
                //  if(update[0].email === data.receptor){   // comente esto y modifique la condicion,
                 if(update[0].adminUser === data.emisor){  

                 
                     //  console.log(update)
           
                       /**//////////////////////////////////////////////// */
                                                                               // new codigo......
                       id_online = IdsOnUser[data.nombre];
                   
 
                   //    //console.log('sii',id_online.length)
                             let element = true;
                                    //    console.log('leng',id_online.length)
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                   
                                     
                               io.to(id_online[i]).emit('new message',{msg:dato02})
                              
                              }
           
                          }              
                 }   
            }

                                       //base de dato

            //    let chat = new Chat();

               
            //        chat.msg = data.ms.texto,
            //        chat.correo_emisor = data.emisor,
            //        chat.correo_recep = data.receptor,
               
            //      chat.save();
                            //aqui estamos guardando los mesajes en la db ........
                            console.log('element',data.element)
                           if(data.element == null|| !data.element){

                               let savemsg =  await new Chat({
                                   msg:data.ms.texto,
                                   correo_emisor:data.emisor,
                                   correo_recep:data.receptor,
                                   imagen:data.imagen,
                                   //chat_room:
                               })
   
                             
                            
                                savemsg.save();
                           }
             
                           // 

            //    {                            EJEMPLO DE LA DATA
            //     ms: { texto: 'wertyuiop' },
            //     nombre: 'o@hotmail.com',
            //     emisor: 'ines@hotmail.com',
            //     receptor: 'o@hotmail.com'
            //   }

          
            //esto aqui se hace para que se pueda reproducir nueestro correo
            io.to(socket.id).emit('new message', {             
                msg:dato02,  //data.ms
                nick: socket.user
            })


            /**//////////////////////////////////////////////// */
          
           
          //  console.log('poooo',user)
                                                                //OJO: En este metodo lo que hacemos es que eliminamos el idSocket casa vez que el adminUser salga de la pagina
                                                                //porque si no fuera asi cada vez que salga de un chat y entre a otro se va a crear un idSocket nuevo para el adminUser
                                                                //y eso hace que cada vez que un usuario escriba se dupliquen los mensaje del admin ya que tiene mas de un idSocket creado.....
                                                                //por eso cada vez que se salga tenemos que borrarlo.....  
                                                                
                                                                socket.on('disconnecto', (val) => {
                                                                    console.log('desconectyuh')
                                                                  id_user = socket.id;
                                                      
                                                                  if(UserOnId[id_user]){
                                                      
                                                                      //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
                                                                      usuario = UserOnId[id_user];
                                                        
                                                                      //ahora borramos el elemento en UserOnId que ya no necesitamos 
                                                                      delete UserOnId[id_user];
                                                        
                                                                      //ahora atrapamos todos los ids del usuario en una variable
                                                                      array_ids = IdsOnUser[usuario];
                                                        
                                                                      //recorremos sus elementos para obtener posicion que necesitamos borrar
                                                                      for (let i = 0; i < array_ids.length; i++) {
                                                                          
                                                                        if( id_user === array_ids[i] ){
                                                                           id_borrar = i;
                                                                        }
                                                                          
                                                                      }
                                                                      //borramos id socket con ayuda de su posicion 
                                                                      IdsOnUser[usuario].splice(id_user, 1)
                                                        
                                                                      //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
                                                                      if(IdsOnUser[usuario].length < 1){
                                                                          delete IdsOnUser[usuario];
                                                                         
                                                                      }
                                                      
                                                                     console.log('usuario: ' +usuario + " desconectandose");
                                                                     console.log('----------------usuarios por id-------------')
                                                                        console.log(UserOnId)
                                                                        console.log('---------------Ids por usuarios-------------')
                                                                        console.log(IdsOnUser)
                                                                        console.log('---------------cantidad de users onlinei------')
                                                                        console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
                                                                       console.log('desconenctado...')
                                                                  }
      })
              
                //   if(data.nombre in user){
                      
                //       user[data.nombre].emit('new message', {             
                //           msg:data.ms,
                //           nick: socket.user
                //       })


                //   }
                //    //esto aqui se hace para que se pueda reproducir nueestro correo
                //   io.to(socket.id).emit('new message', {             
                //     msg:data.ms,
                //     nick: socket.user
                // })
             

           // console.log('successfuly',data.nombre)
        })
        socket.on('disconnect', () => {                // este metodo lo puese ahora13/8/2022
        
            id_user = socket.id;
        
            if(UserOnId[id_user]){
        
                //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
                usuario = UserOnId[id_user];
        
                //ahora borramos el elemento en UserOnId que ya no necesitamos 
                delete UserOnId[id_user];
        
                //ahora atrapamos todos los ids del usuario en una variable
                array_ids = IdsOnUser[usuario];
        
             
        
        
                //recorremos sus elementos para obtener posicion que necesitamos borrar
                for (let i = 0; i < array_ids.length; i++) {
                    
                  if( id_user === array_ids[i] ){
                     id_borrar = i;
                  }
                    
                }
                //borramos id socket con ayuda de su posicion 
                IdsOnUser[usuario].splice(id_user, 1)
        
                //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
                if(IdsOnUser[usuario].length < 1){
                    delete IdsOnUser[usuario];
                   
                }
        
        
               console.log('usuario: ' +usuario + " desconectandose");
               console.log('----------------usuarios por id-------------')
                  console.log(UserOnId)
                  console.log('---------------Ids por usuarios-------------')
                  console.log(IdsOnUser)
                  console.log('---------------cantidad de users onlineo------')
                  console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
                 console.log('desconenctado......')
            }
        
        })

                                                                                       /*Este metodo es nuevo 12/5/2022*/
        // aqui hice unas actializaciones general y fue que estaba (io.to) lo cambie por (socket.broadcast) para cuando enviemos algo no lo enviemos tambien a nosotro...                                                                              
        socket.on('send invitation',( async(data) =>{
            
            
            let dato02 = {
                id: data.id,
                msg: data.ms,
                nombre: data.nombre,
                correo_emisor: data.emisor,
                receptor:data.receptor
            }
            //esto es lo no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
            //el admin este hablando actualmente......
            if(data.role == 'admin'){    
                
                let update = await User.find({email: data.receptor })
               

                if(update[0].adminUser === data.emisor){  
           
                    
                    /**//////////////////////////////////////////////// */
                    // new codigo......
                    id_online = IdsOnUser[data.nombre];
                   
                   //    //console.log('sii',id_online.length)
                             let element = true;
                                    //    console.log('leng',id_online.length)
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                   
                               socket.broadcast.to(id_online[i]).emit('alert',{msg:dato02})
                                     
                              }
                          }              
                 }   // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
            }else if(data.role == null){
           


                let update = await User.find({email: data.receptor })
                //  if(update[0].email === data.receptor){   // comente esto y modifique la condicion,
                 if(update[0].adminUser === data.emisor){  
                    
           
                       /**//////////////////////////////////////////////// */
                                                                               // new codigo......
                       id_online = IdsOnUser[data.nombre];
 
                             let element = true;
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                     
                               socket.broadcast.to(id_online[i]).emit('alert',{msg:dato02})
                              }
           
                          }              
                 }   
            }

            
            
            
            
            
            
            
            
            
            
            
        }))
        

        
        
        /*/////////////////////////////////////////////////////////////*/

        socket.on('alertrespon',( async(data) =>{
    
            console.log('yess',data)
    
            let dato02 = {
                id: data.id,
                msg: data.ms,
                nombre: data.nombre,
                correo_emisor: data.emisor,
                receptor:data.receptor
            }
            //esto es lo no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
            //el admin este hablando actualmente......
            if(data.role == 'admin'){    
                
                let update = await User.find({email: data.receptor })
               

                if(update[0].adminUser === data.emisor){  
           
                    
                    /**//////////////////////////////////////////////// */
                    // new codigo......
                    id_online = IdsOnUser[data.nombre];
                   
                   //    //console.log('sii',id_online.length)
                             let element = true;
                                    //    console.log('leng',id_online.length)
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                   
                               socket.broadcast.to(id_online[i]).emit('resp03',{msg:dato02})
                                     
                              }
                          }              
                 }   // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
            }else if(data.role == null){
           


                let update = await User.find({email: data.receptor })
                //  if(update[0].email === data.receptor){   // comente esto y modifique la condicion,
                 if(update[0].adminUser === data.emisor){  
                    
           
                       /**//////////////////////////////////////////////// */
                                                                               // new codigo......
                       id_online = IdsOnUser[data.nombre];
 
                             let element = true;
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                     
                                socket.broadcast.to(id_online[i]).emit('resp03',{msg:dato02})
                              }
           
                          }              
                 }   
            }


          
          
  

        }))
                               // este metodo es para quitar el snipper de espera de la persona que esta enviando la videollamada
        ////////////////////////////////////////////////////
        socket.on('cancelarvideollamada',async data =>{
            console.log('df',data)
            
            let dato02 = {
                id: data.id,
                msg: data.ms,
                nombre: data.nombre,
                correo_emisor: data.emisor,
                receptor:data.receptor
            }
            //esto es lo no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
            //el admin este hablando actualmente......
            if(data.role == 'admin'){    
                
                let update = await User.find({email: data.receptor })
                if(update[0].adminUser === data.emisor){  
                    /**//////////////////////////////////////////////// */
                    // new codigo......
                    id_online = IdsOnUser[data.nombre];
                   
                   //    //console.log('sii',id_online.length)
                             let element = true;
                                    //    console.log('leng',id_online.length)
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                   
                               socket.broadcast.to(id_online[i]).emit('cancelaciondevideollamada',{msg:dato02})
                                     
                              }
                          }              
                 }   // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
            }else if(data.role == null){

                let update = await User.find({email: data.receptor })
                //  if(update[0].email === data.receptor){   // comente esto y modifique la condicion,
                 if(update[0].adminUser === data.emisor){  
           
                       /**//////////////////////////////////////////////// */
                                                                               // new codigo......
                       id_online = IdsOnUser[data.nombre];
 
                             let element = true;
                         //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                          if( id_online  && id_online != undefined  ){
                              for (let i = 0; i < id_online.length; i++) {
                                     
                                socket.broadcast.to(id_online[i]).emit('cancelaciondevideollamada',{msg:dato02})
                              }
           
                          }              
                 }   
            }


        })
       /////////////////////////////////////////////////////
        
          // cada vez que se sale de la pagina se desconnecta el socket... se borrar el idSocket.....
        socket.on('disconnect', () => {

              id_user = socket.id;

              if(UserOnId[id_user]){

                  //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
                  usuario = UserOnId[id_user];
    
                  //ahora borramos el elemento en UserOnId que ya no necesitamos 
                  delete UserOnId[id_user];
    
                  //ahora atrapamos todos los ids del usuario en una variable
                  array_ids = IdsOnUser[usuario];

               

    
                  //recorremos sus elementos para obtener posicion que necesitamos borrar
                  for (let i = 0; i < array_ids.length; i++) {
                      
                    if( id_user === array_ids[i] ){
                       id_borrar = i;
                    }
                      
                  }
                  //borramos id socket con ayuda de su posicion 
                  IdsOnUser[usuario].splice(id_user, 1)
    
                  //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
                  if(IdsOnUser[usuario].length < 1){
                      delete IdsOnUser[usuario];
                     
                  }
    

                 console.log('usuario: ' +usuario + " desconectandose");
                 console.log('----------------usuarios por id-------------')
                    console.log(UserOnId)
                    console.log('---------------Ids por usuarios-------------')
                    console.log(IdsOnUser)
                    console.log('---------------cantidad de users onlinep------')
                    console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
                   console.log('desconenctado')
              }

        })
    })


   






                                   //              esto lo puse aqui 12/5/2022 puedo borrarlo
    socket.on('disconnect', (val) => {
       
      id_user = socket.id;
      console.log('wid',id_user)

      if(UserOnId[id_user]){

          //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
          usuario = UserOnId[id_user];

          //ahora borramos el elemento en UserOnId que ya no necesitamos 
          delete UserOnId[id_user];

          //ahora atrapamos todos los ids del usuario en una variable
          array_ids = IdsOnUser[usuario];

          //recorremos sus elementos para obtener posicion que necesitamos borrar
          for (let i = 0; i < array_ids.length; i++) {
              
            if( id_user === array_ids[i] ){
               id_borrar = i;
            }
              
          }
          //borramos id socket con ayuda de su posicion 
          IdsOnUser[usuario].splice(id_user, 1)

          //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
          if(IdsOnUser[usuario].length < 1){
              delete IdsOnUser[usuario];
             
          }

         console.log('usuario: ' +usuario + " desconectandose");
         console.log('----------------usuarios por id-------------')
            console.log(UserOnId)
            console.log('---------------Ids por usuarios-------------')
            console.log(IdsOnUser)
            console.log('---------------cantidad de users onlinev------')
            console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
           console.log('desconenctado...')
      }

})


    //                       *****************VideoLlamada*******************
                            //data, receptor
    socket.on('new user02', (roomId, data) => {

        //aqui lo que vamos hacer es cambiar los nombres de las variables
        //para porder hacer una mejor rendicion de la app
    
         // usuario = data.emisor
         usuario = roomId.emisor;
         
      //guardando user por Id
       UserOnId[ id_socket ] = usuario;
    
       //guardando id por user
    //   IdsOnUser[ usuario ] = new Array();
     
       if(IdsOnUser[usuario] == null){
           IdsOnUser[ usuario ] = new Array();
          
       }   

       




      
           IdsOnUser[usuario].push(id_socket)
    
           console.log('----------------usuarios por id-------------')
           console.log(UserOnId)
           console.log('---------------Ids por usuarios-------------')
           console.log(IdsOnUser)
           console.log('---------------cantidad de users onlinee------')
           console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
    
          
             ///*************************************************************************** */
           //// con esto le estamos enviando los alert a un usuario digase un cliente o
           socket.on('send message03', async (data,uu,callback) =>{
               
            callback({
                status:false
            }) 
           
           let dato02 = {
           
               nombre: data.nombre,
               correo_emisor: data.emisor,
               receptor:data.receptor
               
           }
           if(data.role == 'admin'){    
               
               let update = await User.find({email: data.receptor })
               //esto es lo no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
               //el admin este hablando actualmente......
               id_online = IdsOnUser[data.nombre];
              
              //    //console.log('sii',id_online.length)
                        let element = true;
                               //    console.log('leng',id_online.length)
                    //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                     if( id_online  && id_online != undefined  ){
                         for (let i = 0; i < id_online.length; i++) {
                           
                            socket.broadcast.to(id_online[i]).emit('new message02',{ms:(`${uuidv4()}`)},uu)
                         
                         }
                      
                     }              
              
               
               // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
           }else if(data.role == null){
    
    
               let update = await User.find({email: data.receptor })
    
                if(update[0].email === data.receptor){  
                
                    //  console.log(update)
          
                      /**//////////////////////////////////////////////// */
                                                                              // new codigo......
                      id_online = IdsOnUser[data.nombre];
                  
    
                  //    //console.log('sii',id_online.length)
                            let element = true;
                                    
                      //  aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                                                     if( id_online  && id_online != undefined  ){
                                                         for (let i = 0; i < id_online.length; i++) {
                                                           
                                                                
                                                            socket.broadcast.to(id_online[i]).emit('new message02',{ms:(`${uuidv4()}`)}, uu)
                                                        
                                                         }
                                                       
                                                     }              
                                                }  
                                                // socket.on("join-room", (roomId, userId) => {
                                                //     console.log('se esta connectado78')                  //comente esto de ultimo
                                                //   socket.join(roomId);
                                                // //  socket.broadcast.to(roomId).emit("user-connected", userId);
                                                // io.to(roomId).emit("user-connected", userId);
                                                // }); 
                                            }
                                            
                                                        //   /*/////*/  // Video llamada
                                                    
                                                        //   socket.on("join-room", (roomId, userId) => {
                                                        //       console.log('se esta connectado04')
                                                        //     socket.join(roomId);
                                                        //     socket.to(roomId).broadcast.emit("user-connected", userId);
                                                            
                                                        //   });
                                                      
                                                   
                                              
                                              
                                                        /**///////////////////////////////////////////////// */
        })

        // socket.on("join-room", (roomId, userId) => {
        //     console.log('se esta connectado04', roomId, ' USERID:'+ userId)
        //   socket.join(roomId);
        //   socket.broadcast.to(roomId).emit("user-connected", userId);
          
        // });
    

        socket.on('disconnect', () => {
        
            id_user = socket.id;
        
            if(UserOnId[id_user]){
        
                //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
                usuario = UserOnId[id_user];
        
                //ahora borramos el elemento en UserOnId que ya no necesitamos 
                delete UserOnId[id_user];
        
                //ahora atrapamos todos los ids del usuario en una variable
                array_ids = IdsOnUser[usuario];
        
             
        
        
                //recorremos sus elementos para obtener posicion que necesitamos borrar
                for (let i = 0; i < array_ids.length; i++) {
                    
                  if( id_user === array_ids[i] ){
                     id_borrar = i;
                  }
                    
                }
                //borramos id socket con ayuda de su posicion 
                IdsOnUser[usuario].splice(id_user, 1)
        
                //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
                if(IdsOnUser[usuario].length < 1){
                    delete IdsOnUser[usuario];
                   
                }
        
        
               console.log('usuario: ' +usuario + " desconectandose");
               console.log('----------------usuarios por id-------------')
                  console.log(UserOnId)
                  console.log('---------------Ids por usuarios-------------')
                  console.log(IdsOnUser)
                  console.log('---------------cantidad de users onlinef------')
                  console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
                 console.log('desconenctado')
            }
        
        })
        /*/////*/  // Video llamada
                                                      
        socket.on("join-room", (roomId, userId, name) => {
          console.log('se esta connectado0489', roomId, userId , name)
        socket.join(roomId);
        io.to(roomId).emit("user-connected", userId);
        
      });




        // Este metodo es para cerrar la llamada de la persona que no cerror la llamada, O sea la persona contraria a la que le dio a cerrar...

      socket.on('cls', async data => {

        console.log('skjfalsdflasdflajlsdf')

        if(data.role == 'admin'){    
               
            let update = await User.find({email: data.receptor })
            //esto es lo no permite que los mensaje de otro usuario no se puedan colar en el chat activo del admin al meno que no sea la misma persona con la que 
            //el admin este hablando actualmente......
            id_online = IdsOnUser[data.nombre];
            console.log('id_')
           
            console.log('id_',id_online)
           //    //console.log('sii',id_online.length)
                     let element = true;
                            //    console.log('leng',id_online.length)
                 //aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                  if( id_online  && id_online != undefined  ){
                      for (let i = 0; i < id_online.length; i++) {
                        
                        socket.broadcast.to(id_online[i]).emit('cls02',{ms:false})
                             
                      }
                   
                  }              
           
            
            // esto es para los usuario cada vez que el admin le envie un mensaje a un usuario tiene que pasar por esta verificacion para hacer algunos cambios
        }else if(data.role == null){
 
 
            let update = await User.find({email: data.receptor })

            console.log('update',update)
 
          //   if(update[0].adminUser === data.emisor){       esto lo comentamos 10/5/2022
             
                 
                   id_online = IdsOnUser[data.nombre];
               
                   console.log('id_',id_online)
 
               //    //console.log('sii',id_online.length)
                         let element = true;
                                 
                   //  aqui lo que estamos haciendo es, si el cliente envia un msg y el administrador no esta que no de problema...
                                                  if( id_online  && id_online != undefined  ){
                                                      for (let i = 0; i < id_online.length; i++) {
                                                        
                                                             
                                                        socket.broadcast.to(id_online[i]).emit('cls02',{ms:false})
                                                     
                                                      }
                                                    
                                                  }              
                                            // }  
                                          
                                         }
                                         
                                                     
                                         
          
      })

      socket.on("user-disconnected", (userId) => {
        //message in chat saying x user disconnected 
        console.log("New User Disconnected");
        if (peers[userId]) peers[userId].close();
      });

    })   
    
    
    
    socket.on('disconnect', () => {
        
        id_user = socket.id;
    
        if(UserOnId[id_user]){
    
            //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
            usuario = UserOnId[id_user];
    
            //ahora borramos el elemento en UserOnId que ya no necesitamos 
            delete UserOnId[id_user];
    
            //ahora atrapamos todos los ids del usuario en una variable
            array_ids = IdsOnUser[usuario];
    
         
    
    
            //recorremos sus elementos para obtener posicion que necesitamos borrar
            for (let i = 0; i < array_ids.length; i++) {
                
              if( id_user === array_ids[i] ){
                 id_borrar = i;
              }
                
            }
            //borramos id socket con ayuda de su posicion 
            IdsOnUser[usuario].splice(id_user, 1)
    
            //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
            if(IdsOnUser[usuario].length < 1){
                delete IdsOnUser[usuario];
               
            }
    
    
           console.log('usuario: ' +usuario + " desconectandose");
           console.log('----------------usuarios por id-------------')
              console.log(UserOnId)
              console.log('---------------Ids por usuarios-------------')
              console.log(IdsOnUser)
              console.log('---------------cantidad de users onlinek------')
              console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
             console.log('desconenctado')
        }
    
    })
    
    
    
    socket.on('disconnect', () => {
            
        id_user = socket.id;
    
        if(UserOnId[id_user]){
    
            //primero atrapamos su user a partir de su user Id gracias al objecto UserOnId
            usuario = UserOnId[id_user];
    
            //ahora borramos el elemento en UserOnId que ya no necesitamos 
            delete UserOnId[id_user];
    
            //ahora atrapamos todos los ids del usuario en una variable
            array_ids = IdsOnUser[usuario];
    
         
    
    
            //recorremos sus elementos para obtener posicion que necesitamos borrar
            for (let i = 0; i < array_ids.length; i++) {
                
              if( id_user === array_ids[i] ){
                 id_borrar = i;
              }
                
            }
            //borramos id socket con ayuda de su posicion 
            IdsOnUser[usuario].splice(id_user, 1)
    
            //ahora si no quedamos mas is, pues lo borramos porque ya no lo utilizaremos
            if(IdsOnUser[usuario].length < 1){
                delete IdsOnUser[usuario];
               
            }
    
    
           console.log('usuario: ' +usuario + " desconectandose");
              console.log('----------------usuarios por id-------------')
              console.log(UserOnId)
              console.log('---------------Ids por usuarios-------------')
              console.log(IdsOnUser)
              console.log('---------------cantidad de users onlinelp------')
              console.log(Object.keys(IdsOnUser).length) // me quede por aqui 
              console.log('desconenctado')
        }
    
    })
})





}