import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { webSocketService } from '../webSocket';
import  io from 'socket.io-client';
import { Mensaje } from '../model/mensaje';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from '../services/user.services';
import { User } from '../model/userModel';

import { AlertController } from '@ionic/angular';
import { uploadImagen } from '../services/uploadImage';
import { Global } from '../services/global';


import Swal from 'sweetalert2';
import { focusFirstDescendant } from '@ionic/core/dist/types/utils/overlays';
import { AdministradoresPage } from '../administradores/administradores.page';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers:[UserServices,uploadImagen]
  
})
export class ChatPage implements OnInit, DoCheck, OnDestroy {
  


  public sIo = io('https://odontoart.herokuapp.com');
  
  public mensaje: Mensaje;
  public mensajes:Array<any>;
  public ms;
  public identity;
  public nick;
  public prueva:Array<any>;
  public  cl: Array<string>;  
  public receptorr; 
  public val: boolean;
  public url;
  public user;
  personas;
  usuarioDeOtraCuenta;
  last;
  indexx;
  chats = []; 
  index = 0;
  public idClient;
  datos;
  snipper;
  uploadFile;
  token;
  imagenT;
  btn;
  other;
  otherimg;
 

  datoUpdaForma;

  public progres = 0;
  refreshInterval;
   time = 33;
   btn_function =  true;

  constructor(
   // private socket: webSocketService, 
    private route:ActivatedRoute, 
    private userServices:UserServices, 
    private router: Router,  
    public alertController: AlertController,
    public _uploadimagen:uploadImagen,
    // public _userServices: UserServices
    ) { 

      this.url = Global.url;
      this.token = this.userServices.getToken();
    }
  
  
  ngDoCheck(){

      }
      
      ngOnInit() {
      //   const IS_PROD = process.env.NODE_ENV === "production";
      //   const URL = IS_PROD ? "odontoart.herokuapp.com" : "http://localhost:3000";
      //  this.sIo = io(URL);
      

      this.user = new User('','','','','','','','','','','',null,null,null,'','','');


       this.b();

        this.btn =true;
      
        


                            // aqui recivimos la invitacion de la otra persona para una videollamada.
        ////////////////////////////////////////////////////
        this.sIo.on('alert', async (datos)=>{

          
          const alert = await this.alertController.create({
            header: 'VIDEOLLAMADA',
            message: `${datos.msg.msg} quiere hacer una videollamada con usted`,
            backdropDismiss:false,
            
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                id: 'cancel-button',
                handler: (blah) => {
                 
                  
                  
                  
                  let datossw = {
                    id: this.identity._id,
                    ms: 'La videollamada fue rechazada...',
                    nombre:this.datos.nombre,
                    emisor: this.identity.email,
                    receptor: this.datos.receptor,
                    role:null
                  }
                  
                  this.sIo.emit('cancelarvideollamada', datossw)
                   //aqui le estamos enviando estos datos al servidor 
                }
              }, {
                text: 'Aceptar',
                id: 'confirm-button',
                handler: () => {

                  
                  //aqui le vamos a enviar estos datos 
                  let datoss = {
                    id: this.identity._id,
                    ms: this.identity.nombre,
                    nombre: this.datos.receptor,
                    emisor: this.identity.email,
                    receptor: this.datos.receptor,
                    role: 'admin'
                    
                  }
                  if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){
                    
                    datoss = {
                      id: this.identity._id,
                      ms: this.identity.nombre,
                      nombre:this.receptorr.nombre,
                      emisor: this.identity.email,
                      receptor: this.receptorr.receptor,
                      role:null
                    }
                  }
                  
                  this.sIo.emit('alertrespon', datoss)
                  
                  setTimeout(() => {
                    window.location.href = '/videollamada/'+`${datos.msg.id}`;
                    //this.router.navigate(['/videollamada/'+`${datos.msg.id}`])
                  }, 500);
              //    this.sIo.emit("alert02", );           //me quede por aqui
      
                //   this.peer.on("open", (id) => {
                //     console.log('opp',id)
                //    this.sIo.emit("join-room", data.ms, id, this.identity.nombre);           //me quede por aqui
                //  });
                    
                    //  this.camFunction(uu)
                    //  this.calling = false;
       
      
                }
              }
            ]
          });
      
          await alert.present();
      
      
        
        })



        this.sIo.on('resp03',(datos)=>{
          
          this.snipper = false;
          
          setTimeout(() => {
           // this.router.navigate(['/videollamada/'+`${datos.msg.id}`])
            window.location.href = '/videollamada/'+`${datos.msg.id}`;
            this.sIo.emit('disconnecto','')
          }, 500);
        })



                   // este metodo es para cuando una persona le de a cancelar a la hora de que se le envia una videollamada se le quite
                   //el snipper de espera de la persona que envio la videollamada...
        /*/////////////////////////////////////////////////////////*/

        this.sIo.on('cancelaciondevideollamada',async datos =>{

          this.snipper = false;

         
             
          const alert = await this.alertController.create({
            header: 'VIDEOLLAMADA',
            message: `${datos.msg.msg}`,

          })

          await alert.present();

          setTimeout(() => {
            alert.dismiss();
          },1000);
           
        })

        /**/////////////////////////////////////////////////////// */


                                   //este es nuevo
        /**//////////////////////////////////////////////////////////////////// */

        
         this.route.params.subscribe( async (params)  =>{

           //Notificacion...
         let identity = JSON.parse(localStorage.getItem('identity'));
          if(identity.role != 'Role_user'){
            this.userServices.updateData(params.id,{visto:true}).toPromise();
          }
             ////////////////////////////////////////////////////////////////




        let respp = await this.userServices.getOneCliente(params.id).toPromise()

     

          this.datoUpdaForma = respp.user;
        
          let datoss = {
            idAdmin: this.identity._id,
            userEmail: this.datoUpdaForma.email
          }
          this.sIo.emit('onlineEmail',datoss);



       
         if(this.datoUpdaForma.role != 'Role_user'){

           this.datos = {
              id: this.identity._id,
              nombre: this.datoUpdaForma.email,
              emisor: this.identity.email,                       //me quede por aqui                     
              receptor: this.datoUpdaForma.email,
              role: 'Role_user'
            }
          
  
          this.sIo.emit('admin-conenct', this.datos)
          
          this.sIo.emit('new user', this.datos,this.datos.receptor)
         
         
         }
            
         
        });

       

        //*/*////////////////////////////////////////////////////////////////////

      
      //  this.router.navigate(['admin/chatsadmin']);
     
     

         // lo que me esta pasando aqui es que cuando envio un mensaje se dublica el mensaje por los socket dublicado del admin,
         //tengo que borrar cada vez que el admin salga se tiene que borrar el admin idSocket
        
        

        this.identity = JSON.parse(localStorage.getItem('identity'));



        // let datos = {
          
        //   id: this.identity._id,                                     // esto aqui lo estoy comentando, estoy actualizando el codigo...
        //   nombre: 'o@hotmail.com',
        //   emisor: this.identity.email,
        //   receptor: 'o@hotmail.com',
        //   role: 'Role_user',
        // }
          
     
        
      //   let datos = {
      //    id: this.identity._id,
      //    nombre: this.datoUpdaForma.email,
      //    emisor: this.identity.email,                       //me quede por aqui                     
      //    receptor: this.datoUpdaForma.email,
      //    role: 'Role_user'
      //  }


        // //esto es para online del admin.... actualizar la bd...
       //   this.sIo.emit('admin-conenct', this.datos)    esto lo comente ahora
         this.sIo.on('online',datos =>{

           if(datos){
             let update = true;
             this.sIo.emit('update',update)
           }
          
         })
        // this.sIo.emit('send online', datos,datos.receptor)
     //   if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){ esto iba aqui mismo    ,esto lo actualze con otra condicion, (this.identity.role != 'Role_user')
        
        
        this.route.params.subscribe( async (params)  =>{

          if(this.identity.role === 'Role_user'){
            let vatd = await this.userServices.getOneCliente(params.id).toPromise()
            this.other =  vatd.user.nombre;
            console.log(this.other)

          }
          
          this.idClient = params.id;
          
          if(this.identity.role != 'Role_user'){
           let vat = await this.userServices.getOneCliente(params.id).toPromise()

           this.other =  vat.user.nombre;
           this.otherimg = vat.user.imagen
           console.log(vat.user)
           
          this.usuarioDeOtraCuenta = vat.user.email;
          let datoss = {
            idAdmin: this.identity._id,
            userEmail: this.usuarioDeOtraCuenta
          }

        
          this.sIo.emit('onlineEmail',datoss);

          
           /*
           apellido: "marte"
            citas: null
            direccion: null
            edad: null
            email: "ines@hotmail.com"
            imagen: null
            nombre: "ines"
            online: false
            password: "$2a$08$mAnPFraJ9Tlihi0GVLhMb.STypLqJHX8BGroU/KbUPjZmk1YsaFdS"
            role: "Role_user"
            telefono: "809319987"
            __v: 0
            _id: "622a072f42b1950fffa3c211"
           */
                
          this.datos = {
              id: this.identity._id,
              nombre:vat.user.email,
              emisor: this.identity.email,
              receptor: vat.user.email,
              role: 'Role_admin',
          }

          this.receptorr = this.datos;
          this.sIo.emit('new user', this.datos,this.datos.receptor)   
         
          
        }
          });
        

       //  this.sIo.emit('admin-conenct', datos,datos.receptor)
      //  if(this.identity.role != 'Role_admin'){
      //    console.log('asdfasdf')                                     esto lo comente ahora
      //    console.log('datos',this.datos)
      //    this.sIo.emit('new user', this.datos,this.datos.receptor)

      //  }
                           
      //  console.log(this.identity)

                     //BASE DE DATO.....
        this.sIo.on('load old msgs', (data)=>{
          
                
          for(let i = 0; i < data.length; i++){
            this.chats.push(data[i]) //data[i].msg
          
            
          }
        })
        
        //aqui estamos recibiendo los datos  del servidor
        this.sIo.on('new message',  (data) =>{

        
          
         this.index = this.index + 1 ;


         //aqui vamos hacer el metodo para la notificacino de los mensajes....
             //Notificacion...
             let identity = JSON.parse(localStorage.getItem('identity'));
             if(identity.role != 'Role_user'){
               this.userServices.updateData(this.idClient,{visto:true}).toPromise();
             }
                //////////////////////////////////////////////////////////////////

              












       


          // if(this.identity.role === 'Role_user'){                        // me quede por esta parte donde tengo que validar, no permitir que si estamos en un chat con una persona no nospuedan escribir otra persona almeno que estemos en ese chat 

          //   if(data.msg.receptor === this.usuarioDeOtraCuenta){
              
          //     console.log(this.usuarioDeOtraCuenta)
                   
          //      // return  console.log('si estan entrando');
          //      //  this.chats.push() //data.msg.texto
          //     console.log('yes ')
          // //  this.chats.push(data.msg) //data.msg.texto

              
          //   }else{
          //   this.chats.push(data.msg) //data.msg.texto

          //   }

          // }else{

          //   this.chats.push(data.msg) //data.msg.texto
          // }

       

         

         

              if(this.usuarioDeOtraCuenta === data.msg.emisor || this.usuarioDeOtraCuenta === data.msg.receptor){
                this.val = true;
             //   this.chats.push(data.msg) //data.msg.texto                     //  lo corecto es que esto este fuera de esos
              
             
              }else{
                this.val = false
              }
               
              
          


            if(this.val){
              
          //    this.chats.push(data.msg) //data.msg.texto                     //  lo corecto es que esto este fuera de esos
              
              // if(this.usuarioDeOtraCuenta === this.identity.email){
                
                //   this.chats.push(data.msg) //data.msg.texto                     //  lo corecto es que esto este fuera de esos
                //   console.log('si son igual')
                //   console.log( 'si', this.usuarioDeOtraCuenta )
                // }
                
                
              } 
              

          
          this.chats.push(data.msg) //data.msg.texto                     //  lo corecto es que esto este fuera de esos
        //  this.chats.push(data.msg) //data.msg.texto

          console.log(this.chats)
           
                     
                

         // this.nick = data.nick;
        //  this.last = this.chats[this.chats.length -1];

        //  this.indexx = this.chats.length -1;
         
          
       }); 

       
    this.sIo.on('user', (data)=>{
    
      this.personas = data;
    })
    
        //this.prueva = ['dd','dfer','erdfff']
    this.mensaje = new Mensaje('','','','');
  
   
  }



 

  ngOnDestroy(){

   

    
        // console.log('de destruyo la pag')
         
         this.sIo.emit('discont', true)
         if(this.identity.role === 'Role_user'){
          this.router.navigate(['inicio']);

         }else{
           this.router.navigate(['admin/chatsadmin']);

         }
  }
  
  // bueno me quede en esta parte donde tengo que mostrar los mensaje en la vista .....tengo que reparar la vista aqui 
  
  async ionViewWillEnterr(element = null){

    if(element){
      console.log('es01 ',element)
    }else{
      console.log('es02 ',element)

    }
  
  
      // esto aqui lo hacemos para que no se envien mensajes en blanco....
    for (const [key, value] of Object.entries(this.mensaje)) {
      console.log([key, value]);
      console.log('[key, value]');
      if(value === '' &&  this.uploadFile.length === 0){
        return;//this.uploadFile.length
      }
    }

    console.log('obj',Object.values(this.mensaje))

    // if( Object.keys(this.mensaje).length === 0){
    //      return ;
    // }

    // esto aqui es para que cuando le demos al boton de enviar ms inmediatamente se haga un scroll en el chat hacia abajo, dando vista a el ultimo mensaje enviado....
    let chatSelect = document.getElementById('chat');
    chatSelect.scrollTop = chatSelect.scrollHeight; 
  
   // let { texto } = this.mensaje;

  //  let datos = {
  //    ms: this.mensaje,
  //    nombre: 'o@hotmail.com',
  //    emisor: this.identity.email,
  //    receptor: 'o@hotmail.com',
  //    role: 'admin'
  //  }


  let datos = {
    ms: this.mensaje,
    nombre: this.datos.receptor,
    emisor: this.identity.email,
    receptor: this.datos.receptor,
    imagen: '',
    role: 'admin',
    visto: false,
    element: element
  }
   
   if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){
   
   
     datos = {
         ms: this.mensaje,
         nombre:this.receptorr.nombre,
         emisor: this.identity.email,
         receptor: this.receptorr.receptor,
         imagen: '',  
         role:null,
         visto: true,
         element:element
     }




    
   }


   
  // this.userServices.getEmail()

   
    if(this.uploadFile && this.uploadFile.length){
     
      datos.imagen = this.imagenT;
    //  let resp =  this.userServices.getOneCliente(this.identity._id).toPromise();
       console.log('sif')
    //  resp.then((val) =>{{
       
    //   if(!val._id){



    //     this.userServices.sevachat(datos).toPromise();

    //   //   let savemsg =  await new Chat({
    //   //     msg:data.ms.texto,
    //   //     correo_emisor:data.emisor,
    //   //     correo_recep:data.receptor,
    //   //     imagen:data.imagen,
    //   //     //chat_room:
    //   // })
        
    //   }
      
    //  }})

    }else if(Object.keys(this.mensaje).length === 0){
      console.log('nof')

       return ;
    }

   

    
    

    //aqui le estamos enviando estos datos al servidor 
    
      this.sIo.emit('send message', datos)
      this.sIo.emit('admin-conenct03', 'this.datos')

    
    //limpiando input
   let input =  document.getElementById('btn') as HTMLInputElement;
   input.value = '';
    




     // esto aqui es para la notificacion...
   if(this.identity.role === 'Role_user'){
    
    let d = this.userServices.updateData(this.identity._id,{visto:false}).toPromise();
    d.then((val) => {
      
    })
  }
   //esto es para limpiar el input file una vez que se haya enviando una imagen
  document.querySelector<HTMLInputElement>("#uploadCaptureFile").value ='';
    
  }


  adminData(){
    console.log('desconect')
 
  //  this.router.navigate(['admin/chatsadmin']);
  }


  // En esta funcion lo que hacemos es enviarle una invitacion a la otra persona para hacer una videollamada....
  invitarVideoLlamada(){
    
  let datos = {
    id: this.identity._id,
    ms: this.identity.nombre,
    nombre: this.datos.receptor,
    emisor: this.identity.email,
    receptor: this.datos.receptor,
    role: 'admin'
    
  }
   if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){
   
     datos = {
         id: this.identity._id,
         ms: this.identity.nombre,
         nombre:this.receptorr.nombre,
         emisor: this.identity.email,
         receptor: this.receptorr.receptor,
         role:null
     }
   }
    //aqui le estamos enviando estos datos al servidor 
    this.sIo.emit('send invitation', datos)

    this.snipper = true;

  
   

    

  }


   async uploadImagenInput(inputFile:any){

    this.uploadFile = <Array<File>>inputFile.target.files;

      // aqui lo que se esta haciendo un force.. esto es par si el usuario no tiene converzacion con el usuario  y quiere enviar una imagen 
      //le verpita a la foto verse...
    if(this.uploadFile && this.uploadFile.length){

  
      let datos = {
        ms: this.mensaje,
        nombre: this.datos.receptor,
        emisor: this.identity.email,
        receptor: this.datos.receptor,
        imagen: 'sds.jp',
        
      }
      
      let resp =  this.userServices.getChatByEmail(this.identity.email).toPromise();
    
      resp.then( async (val) =>{{
        
        console.log('val',val)
        if(!val.user){
       // datos.imagen = this.imagenT;
       console.log('no hay, no hay que entrar')
    
      
        // let f =  await this.userServices.sevachat(datos).toPromise();
           
        // console.log(f.response._id)
       
    
    
      
      }else{
        console.log('si hay, hay que entrar')
      }
      
     }})

     
     let  barraProgress = document.getElementById('barra');
          barraProgress.style.visibility = "visible";

    this.time = 15;
    this.btn_function = false;

  
     
   this.refreshInterval = setInterval(()=>{
    this.time = this.time - 2;
    this.progres += 0.3;
   
          if(this.time <= 0 ){
            this.btn_function = true;
            this.time = 0;
            this.progres  = 0;
            clearInterval(this.refreshInterval)

          }
        },1000)

        
        
        
        
      }
      
      
      
      
      
      
      
      //
      if(this.uploadFile && this.uploadFile.length){
        let  barraProgress = document.getElementById('barra');

        this.btn = false;

        let datos = {
          ms: this.mensaje,
          nombre: this.datos.receptor,
          emisor: this.identity.email,
          receptor: this.datos.receptor,
          imagen: 'sds.jp',
          
        }

        let result =  await this.userServices.sevachat(datos).toPromise();

        setTimeout( async() => {


           
         
          
          this._uploadimagen.subirImagen(this.url+'subimagen04/'+result.response._id,[],this.uploadFile,this.token,'imagen')
          .then((value:any)=>{

            console.log(value)
            
            this.imagenT = value.response.imagen;
            // llamamos esta funcion para que una vez que le demos a la imagen se envie automaticamente...
            setTimeout(() => {
             // clearInterval(this.refreshInterval);
              barraProgress.style.visibility = "hidden";
              // aqui lo que hacermos cuando la barra carga,
              this.ionViewWillEnterr(true); 
              this.btn = true;    

            }, 5000);
        });
      }, 300);

}








  }


// este metodo es para hacer open en la imagen que envien en el chat
  imagenOpen(img2){

 

    let img = document.getElementById('myImg');

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01") as HTMLImageElement | null;
    var captionText = document.getElementById("caption");
      
     //   modal.style.display = "block";
        modal.style.display = "block";    
     //   modal.style.overflow = "hidden";    

        // modalImg.src = img.getAttribute('src'); 
        modalImg.src =  this.url+'getimagen/'+img2;

        captionText.innerHTML = img.getAttribute('alt');

   

  }
// y este es para cerrar la imagen
  exitImagen(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  
    inputOptions(){
    return   new Promise((resolve) => {
     setTimeout(() => {
       resolve({
         '#ff0000': 'Red',
         '#00ff00': 'Green',
         '#0000ff': 'Blue'
       })
     }, 1000)
   })
    }
  
  async b(){
    /* inputOptions can be an object or Promise */
    
    
//     const { value: color } = await Swal.fire({
//   title: 'Select color',
//   input: 'radio',
//   inputOptions: this.inputOptions,
//   inputValidator: (value) => {
//     if (!value) {
//       return 'You need to choose something!'
//     }
//   }
// })

// if (color) {
//   Swal.fire({ html: `You selected: ${color}` })
// }
//   }




}
 /////////////////////// funcion de la calificacion///////////////////////////
 calificacionf(){


   

  let correo_recep = { correo_recep: this.datos.receptor}

  // la calificacion se activara cuando haya una conversacion.....
   let email = this.userServices.getBothChatting(this.identity.email,correo_recep).toPromise();

   // Aui lo que estamos haciendo es una validacion, de que si hay una interaccion entre si, que se valore dicha interaccion.... 
   email.then((val) => {
    

     if(val.chat.length >= 8){
      let body = document.querySelector<HTMLElement>('.container01');
      body.style.display = 'block'
     }else{
      window.location.href = '/inicio';
     }
     
   })

 }
 
 btnSumit(){

 let val =  (<HTMLInputElement>document.querySelector('[name="rate"]:checked')).value;
  
 

 let user = {
   id: this.identity.nombre.charAt(0).toUpperCase() + this.identity.nombre.slice(1) +' '+this.identity.apellido.charAt(0).toUpperCase() + this.identity.apellido.slice(1),
   calificacionEstrella: val,
   mensaje:this.user.calificacion

 }



   const container01 = document.querySelector<HTMLElement>('.container01')
   const widget = document.querySelector<HTMLElement>('.star-widget')
   const post = document.querySelector<HTMLElement>('.post');
   
   container01.style.display = 'none';
   widget.style.display = 'none';
   post.style.display = 'none';


   this.userServices.calificar(this.identity._id).toPromise();
   let identity = Object.assign(this.identity,{calificar:true});
   localStorage.setItem('identity',JSON.stringify(identity))
    
  let update =  this.userServices.calificandoDoct(this.idClient,user).toPromise();
  update.then((vald)=>{
    console.log(vald)
  
  })
   
  window.location.href = '/inicio';
  
 // return false;

}

btnSumit02(){
  const widget = document.querySelector<HTMLElement>('.star-widget')
  const post = document.querySelector<HTMLElement>('.post');

  widget.style.display = 'block';
  post.style.display = 'none';
  
// return false;
}



}