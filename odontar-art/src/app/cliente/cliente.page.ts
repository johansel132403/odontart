import { Component, OnInit, DoCheck,OnChanges } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { UserServices } from '../services/user.services';
import { Global } from '../services/global';
import { Router, ActivatedRoute } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';
import { CitaServices } from '../services/cita.services';
import { element } from 'protractor';
import { fechaServicio } from '../services/fecha.servicio';
import { CitaPage } from '../cita/cita.page';
import { User } from '../model/userModel';
import { CommonModule } from '@angular/common';
import { uploadImagen } from '../services/uploadImage';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  providers: [ UserServices, CitaServices,CitaPage, uploadImagen]
})
export class ClientePage implements OnInit, DoCheck,OnChanges {

  private user;
  private url;
  private numero;
  private paramsBody;
  private paramsIdCliente;
  private cubo:  Array<any>;
  private datos01;
  private citaUpdate;
  private user02: User;
  public activoo;
  identity;
  uploadFile;
  token;


  private cita: Array<any>;
  

  constructor(
     private cit: CitaPage, 
     private sw: SweetAlert2Module, 
     private _citaServices:CitaServices ,
     private _userServices: UserServices, 
     private _router: Router, 
     private _route: ActivatedRoute,
     public alertController: AlertController,
     public _uploadimagen:uploadImagen,
     ) { 
    

      this._route.params.subscribe((paramsId)=> {

      this.paramsIdCliente = paramsId.id;

     // this.getIdForAction(this.paramsIdCliente);
    })


  }
  
  
  ngOnInit() {
    this.getIdForAction(this.paramsIdCliente);
    this.getcitasDelCliente(this.paramsIdCliente)
    this.identity = JSON.parse(localStorage.getItem('identity'))
    this.token  = JSON.parse(localStorage.getItem('token'))


    this.activoo = {
      activo: false
    }
  //  this.user02 = new User('','','','','','','','','','','',)
  
  this.url = Global.url;
 
  }
  
  ngOnChanges(){
    let something = JSON.parse(localStorage.getItem('cliente'))
    
  }
  
  
  
  
  ngDoCheck(){
    
    this.user = JSON.parse(localStorage.getItem('cliente'))

   
    
    //esto aqui no hace nadaa....
    this.datos01 = JSON.parse(localStorage.getItem('citas'));
    
 //  JSON.parse(localStorage.getItem('citas'));
    

    
  }
  
  
  getcitasDelCliente(id){
    
    
    this._citaServices.getCitasDeUnId(id).subscribe(
      response=>{
        
      

      //  this.cita =  JSON.parse(localStorage.getItem('citas'));
        
        
        localStorage.setItem('citas',JSON.stringify(response.citas))
        //  this.cita = response.citas;
        this.llamada()
    },
    error=>{

      console.log(<any>error);

    }
  )
 }

   llamada(){
    this.cita =  JSON.parse(localStorage.getItem('citas'));
  //  this.cit.getTodasCitas()
   }

  getIdForAction(id){
    
    this._userServices.getOneCliente(id).subscribe(
      response=>{

        localStorage.setItem('cliente',JSON.stringify(response.user))
         
        this.user = response.user;

        
      
     

        
        let tele = this.user.telefono;

        let primero = tele.slice(0,3)

        let segundo = tele.slice(3,6)

        let tercero = tele.slice(6,10)
        
        this.numero = `${primero}-${segundo}-${tercero}`;
        this.user.telefono = this.numero;

       
      },
      err=>{
        console.log(<any>err)
      }
    )
  }

    // Popup Cita agendada...
  async presentAlertPrompt() {

    var fecha = new Date();
    //  con esta  linea de codigo no vamos a tener que usar el metodo (fechaServicio())
    var manana = new Date(fecha.getTime() + 24*60*60*1000);
   

  
    let fecha02 = fechaServicio();
    
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hacer cita',
      inputs: [
        {
          
          name: 'doctor',
          type: 'text',
          placeholder: 'Dr.'
        },
        
        // multiline input.
        {
          name: 'descripcion',
          
          type: 'textarea',
          placeholder: 'descripcion'
        },

        {
          name: 'fecha',
          type: 'date',
          min:manana.toISOString().split('T')[0]
        },
        // input date without min nor max
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (dato) => {

                     // aqui en este pequeño codigo le estamos cambiando el formato a la fecha...
              let fecha = new Date(dato.fecha) 

              


                fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
            
              let optionss  = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
            
                dato.fecha  = fecha.toLocaleDateString("es-ES", <any>optionss )

             
              // aqui estamos creando la cita
             this._citaServices.grearCita(this.user._id,dato).subscribe(
               response=>{  

               

                              
                //**//////////// */
                   //aqui lo  que estamos haciendo es actualizado los datos de la citas.....
                  let elemets = [];

                  let ecr = JSON.parse(localStorage.getItem('citas'))
                  
                  ecr.forEach(element => {
                    elemets.push(element)
                  });

                  elemets.unshift(response.savecitas)
                
                  localStorage.setItem('citas',JSON.stringify(elemets));

                  
                  //aqui lo que voy hacer es llamar a todas las citas para que cuando yo vaya a la vista esten hay la que yo agrege

                  this._citaServices.getCitaWithUser().subscribe(
                    response=>{
                      
                      localStorage.setItem('citauser',JSON.stringify(response.citas))
                     // this.cit.getTodasCitas();
                    },    
                    error=>{
                      console.log(<any>error)
                    }
                    )
                  
                  
                  this.llamada();

         

                },
               error=>{
                 console.log(<any>error)
               }
             )

           
          }
        }
      ]
    });

    await alert.present();
  }

  //Actualizar datos...
  async actualizarDatoPopUp() {

    if(this.user.nombre == undefined || this.user.nombre == ''){
      this.user.nombre = '';
    }
    if(this.user.email == undefined || this.user.email == ''){
      this.user.email = '';
    }
    if(this.user.apellido == undefined || this.user.apellido == ''){
      this.user.apellido = '';
    }
    if(this.user.edad == undefined || this.user.edad == ''){
      this.user.edad = '';
    }
    if(this.user.direccion == undefined || this.user.direccion == ''){
      this.user.direccion = '';
    }

    if(this.user.activo == undefined || this.user.activo == ''){
      this.user.activo = '';
    }


  
   
    const alert = await this.alertController.create({
      cssClass: 'udateData',
      header: 'Actualizar los datos',
      
      inputs: [
        {
          name: 'nombre',
          value: `${this.user.nombre}`,
          type: 'text',
          placeholder: 'Dr.'
        },
        
        
        {
          name: 'email',
          value: `${this.user.email}`,
          type: 'text',
          placeholder: 'email'
        },

        {
          name: 'apellido',
          value: `${this.user.apellido}`,
          type: 'text',
          placeholder: 'apellido'
        },

        {
          name: 'edad',
          value: `${this.user.edad}`,
          type: "text",
          placeholder: 'edad'
        },
        {
          name:'direccion',
          value:`${this.user.direccion}`,
          type:"text",
          placeholder:"direccion"
        },
        {
          name: 'activo',
          value: `${this.user.activo}`,
          type: "text",
          placeholder: 'activo'
        },
       

       

        
       
       
       
        // input date with min & max
      
        // input date without min nor max
          
        
        
      ],
      
      buttons:
      
      [

        {
         
          
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (e) => {
           
            this.actualizarDatos(e);
            
          }
        }
      ]
      
      
    });

    await alert.present();
  }


   // Actualizar contacto...
   async actualizarContacto() {

    if(this.user.telefono == undefined || this.user.telefono == ''){
      this.user.telefono = '';
    }
   
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Actualizar contacto',
      inputs: [
        {
          
          name: 'telefono',
          type: 'text',
          value: `${this.user.telefono}`,
          placeholder: 'Numero'
        },
        
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (dato) => {
            this.actualizarDatos(dato);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  actualizarDatos(datos){

   
         //este if lo que no va a permitir es que esta funcion se pueda aplicar de ambos popups sin que de error
         //por que el popup de lo contacto tiene el valor del telefono y el poppup de los otros no lo tiene
    if(datos.telefono){

      let tele = datos.telefono;
  
      let primero = tele.slice(0,3)
      
      let segundo = tele.slice(3,6)
      
      let tercero = tele.slice(6,10)
      
      this.numero = `${primero}-${segundo}-${tercero}`;
      
      datos.telefono = this.numero;
    }

    Swal.fire({
      heightAuto: false,        
      icon: 'success',
      title: 'Datos actualizados',
      showConfirmButton: false,
      timer: 1500
     
    })

     this._userServices.updateData(this.user._id,datos).subscribe(
       response=>{

        //aqui estamos actualizando los datos del front
        localStorage.setItem('cliente',JSON.stringify(response.user));
       
     },error=>{
       console.log(<any>error)
     }
     
     
     )
  }   
                                                  //        y de ultimo tu sientes que has malgastado tu tiempo conmigo


   //actualizar cita....
  async editarCita (id){

    //me quede por aqui haciendo la actualizacion de citas

  
    let fecha02 = fechaServicio();
    
     this._citaServices.getOneCita(id).subscribe(
      async response =>{
        
         this.citaUpdate = response.citaa;
                                                                             //me quede por aqui por la fecha aqui tengo que hace algo para que no diga Invalid Date... cuando voy a editar una imagen...
         if(this.citaUpdate.fecha === 'Invalid Date'){
           
           this.citaUpdate.fecha = 'Seleccione una fecha'
          }
          console.log(this.citaUpdate.fecha)

         const alert = await this.alertController.create({
           cssClass: 'my-custom-class',
           header: 'Actualizar Datos',
           inputs: [
             {
               
               name: 'doctor',
               type: 'text',
               value: this.citaUpdate.doctor,
               placeholder: 'Dr.'
             },
             
             // multiline input.
             {
               name: 'descripcion',
               value:this.citaUpdate.descripcion,
               type: 'textarea',
               placeholder: 'descripcion'
             },

             
     
             {
               
               name: 'fecha',
               type: 'date',
               value:this.citaUpdate.fecha,
               min:fecha02
             },
            //  {
            //   name: 'fecha',
            //   type: 'date',
            //   min:fecha02,
              
            // },
             // input date without min nor max
             
           ],
           buttons: [
             {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: () => {
                 console.log('Confirm Cancel');
               }
             }, {
               text: 'Ok',
               handler: (dato) => {

                // console.log(dato)
     
                          // aqui en este pequeño codigo le estamos cambiando el formato a la fecha...
                   let fecha = new Date(dato.fecha) 
     
                     fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
                 
                   let optionss  = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
                 
                     dato.fecha  = fecha.toLocaleDateString("es-ES", <any>optionss )

                    

                   // aqui lo que estoy es editando las citas....
                  this._citaServices.editCitas(this.citaUpdate._id,dato).subscribe(
                  async  response=>{  
     
                      let arry = [];
               
                        //Actualizar cita.....
     
                         arry = JSON.parse(localStorage.getItem('citas'))

                         for(let i in arry){

                            if( arry[i]._id == response.cita._id ){
                                 arry[i] = response.cita
                            }
                         }

                        localStorage.setItem('citas',JSON.stringify(arry));

                        Swal.fire({
                          heightAuto: false,        
                          icon: 'success',
                          title: 'Datos actualizados',
                          showConfirmButton: false,
                          timer: 1500
                         
                        })

                      this.llamada();

                      //hacemos esto aqui para que a la hora que estemos en la vista de cita podamos ver la actualizacion de la cita actualizada....
                      let resp = await this._citaServices.getCitaWithUser().toPromise();
                          localStorage.setItem('citauser',JSON.stringify(resp.citas))
     
                     },
                    error=>{
                      console.log(<any>error)
                    }
                  )
     
                
               }
             }
           ]
         });
     
         await alert.present();

         console.log(this.citaUpdate.doctor)
      },
      error=>{

        console.log(<any>error)

      }

      
    )
    
  
     
  }                                               

  //borrar una cita .... 
  borrarCita(id){
    //bueno me quede por aqui 
    // icon: 'success',
    // title: 'Datos actualizados',
    // showConfirmButton: false,
      // timer: 1500
      Swal.fire({
        heightAuto: false,        
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
       cancelButtonColor: '#3085d6',
       confirmButtonText: 'Si, Eliminar !'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          heightAuto: false,
          icon: 'success',
          title: 'Este datos se elimino',
          showConfirmButton: false,
          timer: 1500
          
        })
        this._citaServices.DeleteCitas(id).subscribe(
          response=>{
            this.getcitasDelCliente(this.paramsIdCliente)
          },
          error=>{
            console.log(<any>error)
          }
        )

      }
    })



  }

   
  //cuardar los datos del campo activo
  functionprueba(e){

    

     let datos ={
       activo:true
     }

    if(this.user.activo){
         datos.activo = false
    }else{
      datos.activo = true

    }

    

    this._userServices.updateData(this.user._id, datos).subscribe(
     response=>{
        //console.log('update',response)
     },
     error=>{
       console.log(error)
     }
   )

  }

// cambiar contraseña..
async cambiarcontrasena(){
  console.log('cambiando contrasena');

  if(this.user.password == undefined || this.user.password == ''){
    this.user.password = '';
  }

 
  const alert = await this.alertController.create({
    cssClass: 'udateData',
    header: 'Cambiar contraseña',
    
    inputs: [
      {
        name: 'password',
    //    value: `${this.user.password}`,
        value: '',
        type: 'password',
        placeholder: 'password'
      },
      
    ],
    
    buttons:
    
    [

      {
       
        
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (e) => {
         
        

         let response = this._userServices.cambiarcontrasena(this.user._id,e).toPromise();

         response.then((resul)=>{
              console.log(resul)
              Swal.fire({
                heightAuto: false,
                icon: 'success',
                title: 'Contraseña actualizada',
                showConfirmButton: false,
                timer: 1500
                
              })
         })
          
        }
      }
    ]
    
    
  });

  await alert.present();
}


//subir imagen....
uploadImagenInput(inputFile:any){

  let idCliente = JSON.parse(localStorage.getItem('cliente'))
    
  this.uploadFile = <Array<File>>inputFile.target.files;
    //
    if(this.uploadFile && this.uploadFile.length > 0){
    
      setTimeout(() => {

        console.log(this.token)
        
        this._uploadimagen.subirImagen(this.url+'subimagen/'+idCliente._id,[],this.uploadFile,this.token,'imagen')
        .then((value:any)=>{

       
           // este codigo es para cambiar la imagen.....
           document.querySelector(".myImageId").setAttribute( 'src', this.url+'getimagen/'+`${value.response.imagen}` );
         
      });

    }, 300);

}








}



}
