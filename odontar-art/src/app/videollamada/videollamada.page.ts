import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from '../services/user.services';
import  io from 'socket.io-client';

import { LoadingController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

//const Peer = require('peerjs')
import   Peer, { DataConnection }  from 'peerjs';     //aunque este asi en rojo esta funcionando...


import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.page.html',
  styleUrls: ['./videollamada.page.scss'],
})
export class VideollamadaPage implements OnInit {
  //https://odontoart.herokuapp.com
// public sIo = io('http://localhost:3800');
  public sIo = io('https://odontoart.herokuapp.com');
  public identity;
  public usuarioDeOtraCuenta;
  public receptorr;
  peer;
  public camaraFunction;
  user;
  roomID;
  uu;
  public calling;
  public myVideoStream;
  public mediaConnection;
  public idClient;
  
  popo;

   otherPeer;
   thisPeer;
   datoUpdaForma;
   datos;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private userServices:UserServices,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) {


  
    
   this.uu = uuidv4();

    this.identity = JSON.parse(localStorage.getItem('identity'));

    this.user = this.identity.name;

  /**/////////////////////////////////////////////////////////////////// */
    const videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    const showChat = document.querySelector("#showChat");
    const backBtn = document.querySelector(".header__back");
    // myVideo.muted = true;

    this.peer = new Peer(undefined, {
      path: "/peerjs",
      // host: 'localhost',
      host:'odontoart.herokuapp.com',
      port: 443, //this port has given us heroes....
      secure: true
      


     });
     //  console.log(this.peer)


  }
  ngOnInit() {

                    //   obtener id para saber a quien es que vamos a llamar
    this.route.params.subscribe( async (params)  =>{

      let respp = await this.userServices.getOneCliente(params.id).toPromise()

      this.datoUpdaForma = respp.user;

        if(this.identity.role === 'Role_user'){

          this.datos = {
            
            id: this.identity._id,
            nombre: this.datoUpdaForma.email,
            emisor: this.identity.email,
            receptor: this.datoUpdaForma.email,
            role: 'Role_user',
          }
          
          this.sIo.emit('new user02', this.datos,this.datos.receptor)
        }
        
    })






    this.sIo.on('cls02',  data =>{

      let val = data.ms;

      if(val == false){
       
        let element = document.querySelector('#video-grid');
        element.remove()
       // this.peer.destroy()

        // en esta funcion sale el snipper a la persona que le hemos colgado la llamada...
       this.segunDelete()
        
       
      }
        
    })

    //botton call
    this.calling = true;

    this.peer.on('open', (id) => {
      this.roomID = id;
      /*//////////////////////////////////////////////////////////////////////////**/    //colgar video

 

        this.peer.on("connection", (conn) => {  // listen for data connection here
     
      this.otherPeer = conn;
      conn.on("data", (data) => {
        if (data == "end") {
          conn.close();
          if (this.peer != null) {
            this.peer.destroy();
          }
          console.log("the caller ended the call", data);
        }
      });
    });


       

      /*/////////////////////////////////////////////////////////////////////*/

      console.log('d',this.roomID)
      console.log('uuidv4()',this.uu )
      
  // this.sIo.emit('join-room', this.uu, this.roomID, this.identity.nombre);
     // console.log('id/8/',id)
    //  this.sIo.emit('join-room',datos.receptor)
    })

    // let datos = {

    //   id: this.identity._id,
    //   nombre: 'o@hotmail.com',         // esto lo estoy comentando porque lo actualize arriba...
    //   emisor: this.identity.email,
    //   receptor: 'o@hotmail.com',
    //   role: 'Role_user',
    // }


    if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){

      console.log("datos.receptor")

      this.route.params.subscribe( async (params)  =>{

       let vat = await this.userServices.getOneCliente(params.id).toPromise()

      this.usuarioDeOtraCuenta = vat.user.email;
      let datoss = {
        idAdmin: this.identity._id,
        userEmail: this.usuarioDeOtraCuenta
      }

      this.datos = {
          id: this.identity._id,
          nombre:vat.user.email,
          emisor: this.identity.email,
          receptor: vat.user.email,
          role: 'Role_admin',
      }
      this.receptorr = this.datos;
      
      this.sIo.emit('new user02', this.datos,this.datos.receptor)

      });

    }

   //  this.sIo.emit('admin-conenct', datos,datos.receptor)
   if(this.identity.role != 'Role_admin'){
    // this.sIo.emit('new user02', this.datos,this.datos.receptor)


   }


   this.sIo.on('new message02', async (data,uu) =>{

   

   if(data.ms){

    this.camFunction(uu)
    this.calling = false;
    
    //                                                           ** lo que hice aqui fue comentar la alert, para que la videollamada entre dirrecta...
                            
    // const alert = await this.alertController.create({
    //   header: 'VIDEOLLAMADA',
    //   message: '',
    //   backdropDismiss:false,
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       id: 'cancel-button',
    //       handler: (blah) => {
    //         console.log('Confirm Cancel: blah');
    //       }
    //     }, {
    //       text: 'Okay',
    //       id: 'confirm-button',
    //       handler: () => {
    //        // this.sIo.emit("join-room", data.ms, this.identity.nombre);           //me quede por aqui

    //       //   this.peer.on("open", (id) => {
    //       //     console.log('opp',id)
    //       //    this.sIo.emit("join-room", data.ms, id, this.identity.nombre);           //me quede por aqui
    //       //  });
              
    //            this.camFunction(uu)
    //            this.calling = false;


    //       }
    //     }
    //   ]
    // });

    // await alert.present();





   }

  });



    /**//////////////////////////////////////////////////////////////////// */

    //this.camFunction()

    //Metho to mike a videocall....
   // this.createVideo();


   const videoGrid = document.getElementById("video-grid");
   const myVideo = document.createElement("video");
   console.log(myVideo)

    myVideo.className = 'video';
    myVideo.muted = true;   //ojo aqui ver si no esta en muted....



   navigator.mediaDevices.getUserMedia({   
       audio: true,
       video: true,
   })
   .then((stream) => {
    
       this.myVideoStream = stream;
      this.addVideoStream(myVideo, stream);

     

      // peer              /*/*//////////////////////////////////
      this.peer.on("call", (call) => {
        this.mediaConnection = call;
         console.log('yes ')
       call.answer(stream);
       const video = document.createElement("video");
       call.on("stream", (userVideoStream) => {
         this.addVideoStream(video, userVideoStream);
      

       });
     });

    


     this.sIo.on("user-connected", (userId) => {


      this.uu = userId;
      
       this.connectToNewUser(userId, stream);

     });
   });

   /*//////////////////////////////////////**/////////////////////// */


   setTimeout(() => {
     
     this.sockeCall( this.datos )
  }, 500);
  // socket.IO CALL....


  }


  createVideo(){

    // const videoGrid = document.getElementById("video-grid");
    // const myVideo = document.createElement("video");


    //  myVideo.muted = true;



    // navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //     video: true,
    // })
    // .then((stream) => {
    //   console.log('STREAM',stream)
    //     this.myVideoStream = stream;
    //    this.addVideoStream(myVideo, stream);


    //    // peer              /*/*//////////////////////////////////
    //    this.peer.on("call", (call) => {
    //     call.answer(stream);
    //     const video = document.createElement("video");
    //     call.on("stream", (userVideoStream) => {
    //       this.addVideoStream(video, userVideoStream);
    //     });
    //   });
    //   console.log('userId02')

    //   this.sIo.on("user-connected", (userId) => {

    //     console.log('userId')
    //     this.connectToNewUser(userId, stream);
    //   });
    // });
  }



   

   connectToNewUser(userId, stream)  {
   
                             
    const call = this.peer.call(userId, stream);

 /**//////////////////////////////////////////////////////////////// */ esto aqui lo estoy haciendo para colgar la llamada
    // this.thisPeer = this.peer.connect(userId);
    // this.thisPeer.on("data", (data) => {
    //   if (data == "end") {
    //     this.thisPeer.close();
    //     if (this.peer != null) {
    //       this.peer.destroy();                                                     
    //     }
    //     console.log("the caller ended the call", data);
    //   }
    //   call.on("stream", (remoteStream) => {
    //     this.addVideoStream(video, remoteStream);
    //   });
    // });
    


 /**//////////////////////////////////////////////////////////////// */



    this.mediaConnection = call;
   // this.thisPeer = this.peer.connect(userId);

    const video = document.createElement("video");
   
    call.on("stream", (userVideoStream) => {

      console.log(call,userVideoStream)
     
      this.addVideoStream(video, userVideoStream);
    });
  
  };

  




   addVideoStream = (video, stream) => {
     
    const videoGrid = document.getElementById("video-grid");

    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
       video.play();
       videoGrid.append(video);
    });



};






primeraFunction(){
  document.querySelector<HTMLElement>(".main__left").style.display = "flex";
  document.querySelector<HTMLElement>(".main__left").style.flex = "1";
  document.querySelector<HTMLElement>(".main__right").style.display = "none";
  document.querySelector<HTMLElement>(".header__back").style.display = "none";
}





showChat(){

  document.querySelector<HTMLElement>(".main__right").style.display = "flex";
  document.querySelector<HTMLElement>(".main__right").style.flex = "1";
  document.querySelector<HTMLElement>(".main__left").style.display = "none";
  document.querySelector<HTMLElement>(".header__back").style.display = "block";
}





sockeCall(datosd){

 

  this.identity = JSON.parse(localStorage.getItem('identity'));

  console.log('log',this.datos.email)
  let datos = {

    id: this.identity._id,
    nombre: this.datos.email,
    emisor: this.identity.email,
    receptor: this.datos.email,
    role: 'Role_user',
  }


  // this.sIo.emit('send online', datos,datos.receptor)

  if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){

    this.route.params.subscribe( async (params)  =>{

     let vat = await this.userServices.getOneCliente(params.id).toPromise()

    this.usuarioDeOtraCuenta = vat.user.email;
    let datoss = {
      idAdmin: this.identity._id,
      userEmail: this.usuarioDeOtraCuenta
    }
    datos = {
        id: this.identity._id,
        nombre:vat.user.email,
        emisor: this.identity.email,
        receptor: vat.user.email,
        role: 'Role_admin',
    }

    this.receptorr = datos;
    // this.peer.on('open', (id) => {
    //   this.roomID = id;
    //   console.log('id',id)
    //   this.sIo.emit('join-room',uuidv4(),datos.receptor)
    // })

    
    });

  }
    //  // esto se llama de una
    //  this.peer.on('open', (id) => {
    //   this.roomID = id;
    //   console.log('id',id)
    //   this.sIo.emit('join-room',datos.receptor)
    // })
;

}




startVideoCall(){

  this.sIo.emit('join-room', this.uu, this.roomID, this.identity.nombre);


  let datos = {

    nombre: this.datos.receptor,
    emisor: this.identity.email,
    receptor: this.datos.receptor,
    role: 'admin'

  }

  console.log('drr',this.datos)

  if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){
    datos = {
        nombre:this.receptorr.nombre,
        emisor: this.identity.email,
        receptor: this.receptorr.receptor,
        role:null
    }
  }
                                             
                                       // console.log('joj', uuid() )
  this.sIo.emit('send message03',  datos,this.uu, response => {
    //aqui lo que estamos es haciendo que cuando uno manda una solicitud y la aceptan el botton de colgar cambie.....
    this.calling = response.status;
    
  })



//   this.peer.on("open", (id) => {
    
   
//   // this.sIo.emit("join-room", uuidv4(), , datos);
//  });


     

}


camFunction(uuidv){

  
  this.sIo.emit('join-room',uuidv, this.roomID, this.identity.nombre);

  //  this.peer.on('open', (id) => {

  //     this.sIo.emit('join-room', id,datos)
  //   })
     // camara

     
  // this.peer.on("open", (id) => {
    
   
  //   this.sIo.emit("join-room",uuidv4(), id, );
  // });
    }


    muteButton(){
  //const inviteButton = document.querySelector("#inviteButton");
  const muteButton = document.querySelector("#muteButton");
  //const stopVideo = document.querySelector("#stopVideo");

  const enabled = this.myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    this.myVideoStream.getAudioTracks()[0].enabled = false;
    let html = `<ion-icon name="mic-off-outline"></ion-icon>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    this.myVideoStream.getAudioTracks()[0].enabled = true;
    let html = `<ion-icon name="mic-outline"></ion-icon>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }

}                                                                                    //OJO TENGO QUE QUITAR LOS FAVICON*****

stopVideo(){
  const stopVideo = document.querySelector("#stopVideo");

  const enabled = this.myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    this.myVideoStream.getVideoTracks()[0].enabled = false;
   let  html = `<ion-icon name="videocam-off-outline"></ion-icon>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    this.myVideoStream.getVideoTracks()[0].enabled = true;
    let html = `<ion-icon name="videocam-outline"></ion-icon>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
}


inviteButton(){
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
}

async cancelarLLamada(userId){
           //           https://stackoverflow.com/questions/67249772/cant-close-connection-beetween-peer-on-peerjs
           // colgar llamada........
//   if (this.otherPeer != null) {
//     this.otherPeer.send("end");
//  }
//  if (this.thisPeer != null) {
//     this.thisPeer.send("end");
//  }
//  if (this.peer != null) {
// }

 //this.peer.destroy();

//  for (let conns in this.peer.connections) {
//   this.peer.connections[conns].forEach((conn, index, array) => {
//     console.log(`closing ${conn.connectionId} peerConnection (${index + 1}/${array.length})`, conn.peerConnection);
//     conn.peerConnection.close();

//     // close it using peerjs methods
//     if (conn.close)
//       conn.close();
//   });
// }
let datos = {

  id: this.identity._id,
  nombre: this.datos.receptor,
  emisor: this.identity.email,
  receptor: this.datos.receptor,
  role: null,
}


if(this.identity.role === 'Role_admin'){

 

  this.route.params.subscribe( async (params)  =>{

   let vat = await this.userServices.getOneCliente(params.id).toPromise()

  this.usuarioDeOtraCuenta = vat.user.email;
  let datoss = {
    idAdmin: this.identity._id,
    userEmail: this.usuarioDeOtraCuenta
  }

  datos = {
      id: this.identity._id,
      nombre:vat.user.email,
      emisor: this.identity.email,
      receptor: vat.user.email,
      role: 'admin',
  }
  this.receptorr = datos;
  
  //this.sIo.emit('new user02', datos,datos.receptor)

  this.idClient = params.id;
  this.sIo.emit('cls', datos)
  let element = document.querySelector('#video-grid');
  element.remove()
  

  });

}else{

  this.sIo.emit('cls', datos)
  let element = document.querySelector('#video-grid');
  element.remove()
}





  // con this.peer.destroy, destruimos las sesion de videollamada de ambas conencciones....
 // this.peer.destroy()
  this.calling = true;

  //snipper 
  const loading = await this.loadingController.create({
    message: 'Cerrando Videollamada...',
    duration: 2000,
  });

  await loading.present();

  // reiniciamos la pagina....
  // this.router.navigate(['/chat/'+`${this.idClient}`])   // eslo lo voy actualizar
  if(this.identity.role === 'Role_subadmin' || this.identity.role === 'Role_admin'){
    this.router.navigate(['/admin'])

  }else{
    this.router.navigate(['/inicio'])

  }
  //this.router.navigate(['/inicio'])
  
  setTimeout( async ()=>{
    window.location.reload();
  },2000)


 
  
 
     

      
 // this.popo.destroy();
  // this.thisPeer = this.peer.connect(userId);
  // this.thisPeer.on("data", (data) => {
  //   console.log('data ');

  //   console.log('data ',data);
  //   // if (data == "end") {
  //   //   this.thisPeer.close();
  //   //   if (this.peer != null) {
  //   //     this.peer.destroy();
  //   //   }
  //   //   console.log("the caller ended the call", data);
  //   this.thisPeer.close();
  //   // }
  // });
  // console.log('Este id se esta eliminando',this.thisPeer)
  // console.log('Este id se esta eliminando',userId)
  // console.log('yee',this.peer[userId])
  // if (this.peer[userId]) this.peer[userId].close();
  // this.sIo.emit('desconent',)
  
 //  window.location.reload();
}

//esta funcion le sale a la persona que le colgaron la llamada...
async segunDelete(){

     
        //snipper 
      const loading = await this.loadingController.create({
        message: 'Cerrando Videollamada...',
        duration: 2000,
      });

      await loading.present();
      
      // reiniciamos la pagina....
      if(this.identity.role === 'Role_subadmin' || this.identity.role === 'Role_admin'){
        this.router.navigate(['/admin'])

      }else{
        this.router.navigate(['/inicio'])

      }
      setTimeout( async ()=>{

        window.location.reload();
      },2000)
      
    }
    

  


}
