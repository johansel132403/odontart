
// este codigo es nuevo.......
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent ,  Observable, empty, from } from 'rxjs';
import { map, share, auditTime, debounceTime} from 'rxjs/operators';






/**///////////////////////////////////////////////////////////////////////////////// */
import { Component, DoCheck, OnChanges, OnInit,HostListener   } from '@angular/core';
import { HomePage } from '../home/home.page';


import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SMS } from '@awesome-cordova-plugins/sms/ngx'; 
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

import { AlertController } from '@ionic/angular';
import { Services } from '../services/sms.services';
import { CitaServices } from '../services/cita.services';
import { UserServices } from '../services/user.services';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  providers:[CitaServices,UserServices],
  
})

export class InicioPage implements OnInit, DoCheck, OnChanges {
  
  // public scroll$:Observable<number>;
  // data gmail...
  subject:string ='';
  body:string ='';
  to:string ='';
  notes;
  val;
  notificacionView;
  // URL Para WhatssApp.....
  countrycode: string = '+1';
  whatsappnumber:string = '8093199970';
  url:string = "https://wa.me/"+this.countrycode+this.whatsappnumber+"?text=Hello";
  identity;
  alertError;
  
  // @HostListener('window:scroll', ['$event']) getScrollHeight(event) {
  //       console.log(window.pageYOffset, event);
  //    }
      constructor(
        
        private callnub: CallNumber, 
        public alertController: AlertController, 
        private mensage: Services,
        private email: EmailComposer,
        private _citaServices:CitaServices ,
        private _userService: UserServices,
        private router:Router
           // este codigo aqui no lo estamos usuando.....
        // @Inject(DOCUMENT) private document:any,
        // @Inject(PLATFORM_ID) private platformId: Object
        
        ) { 

          
          //este codigo va actualizar los datos de la notificacion cada vez que hagamos scroll....  
          //esto tiene un tiempo 3000, se dispara 1 vez cada vez que se cumple el tiempo.....      
        const clicks = fromEvent(window, 'scroll',{ capture: true });
        const result = clicks.pipe(auditTime(3000)); 
        result.subscribe(x => 
          //aqui llamamos las notificaciones...
        
          this.getAllPost()
          
          );

        //  let el =  fromEvent(window,'mousemove')
        //   el.pipe(
        //     auditTime(200),   
        //     map(event =>{
        //       console.log('djasf')
        //       return window.scrollY || this.document.documentElement.scrollTop;
        //     }),      
        //     share());



      //    el.subscribe((e:MouseEvent)=>{
      //  //  console.log(e)
      //    })

          // if(isPlatformBrowser(this.platformId)){
          //   console.log('sd')
          //   const content = document.querySelector('main');
          //   this.scroll$ = fromEvent(window, 'mousemove').pipe(
          //     auditTime(200),
          //     map(event =>{
          //       console.log('djasf')
          //       return window.scrollY || this.document.documentElement.scrollTop;
          //     }),      
          //     share());
          //   }
          //   else{
          //     console.log('asdfasdfasdf')
          //    // this.scroll$ = empty();
          //   }
          // }
          
        }
          
     
          ngOnInit() {
            this.identity = this._userService.getIdentity();
            this.getAllPost()
           
            // window.addEventListener('scroll', this.scroll, true); 
          
            // const clicks = fromEvent(window, 'scroll');
            // const result = clicks.pipe(debounceTime(1000));
            // result.subscribe(x => console.log(x));
                        
            // this.scroll$.subscribe(element => {
            //   console.log("dd")
            //   // do whatever
            // });
        
  }

  // scroll(event){
  //   setTimeout(()=>{
  //     console.log('dfdf',event)

  //   },10000)
  // }

 

  ngOnChanges(){
   
  }


  ngDoCheck(){
   
 
  
  }

  // llamar 
  Call(){
    this.callnub.callNumber("18093199970", true)
  .then(res => console.log('Make Call!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

  //Enviar mensaje 
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Enviar SMS',
      inputs: [
        {
          name: 'sms',
          type: 'textarea',
          placeholder: 'Message'
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
          handler: (e) => {
            this.mensage.SendSms(e.sms);
            console.log(e)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  SendGmail(){

    let gmail = {
      to: this.to,
      cc: [],
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app:'Gmail'
    }
    this.email.open(gmail);
  }


 async hacerCita(){
    var fecha = new Date();
    //  con esta  linea de codigo no vamos a tener que usar el metodo (fechaServicio())
    var manana = new Date(fecha.getTime() + 24*60*60*1000);
   

  
   
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hacer cita',
      inputs: [
        {
          
          name: 'doctor',
          type: 'text',
          placeholder: 'Dr.',
          disabled: true
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
             this._citaServices.grearCita(this.identity._id,dato).subscribe(
               response=>{  

                if(response.savecitas._id){
                  Swal.fire({
                    heightAuto: false,
                    icon: 'success',
                    title: '¡Cita creada!',
                    showConfirmButton: false,
                    timer: 3000
        
                  })
                }
              
                localStorage.setItem('micita',JSON.stringify(response.savecitas));
                              
              //   //**//////////// */
              //      //aqui lo  que estamos haciendo es actualizado los datos de la citas.....
              //     let elemets = [];

              //     let ecr = JSON.parse(localStorage.getItem('citas'))
                  
              //     ecr.forEach(element => {
              //       elemets.push(element)
              //     });

              //     elemets.unshift(response.savecitas)
                
              //     localStorage.setItem('citas',JSON.stringify(elemets));

                  
              //     //aqui lo que voy hacer es llamar a todas las citas para que cuando yo vaya a la vista esten hay la que yo agrege

              //     this._citaServices.getCitaWithUser().subscribe(
              //       response=>{
                      
              //         localStorage.setItem('citauser',JSON.stringify(response.citas))
              //        // this.cit.getTodasCitas();
              //       },    
              //       error=>{
              //         console.log(<any>error)
              //       }
              //       )
                  
              //     //este metodo es para obtener las llamadas
              //  //   this.llamada();

         

                },
               error=>{
                this.alertError = true;

                Swal.fire({
                  heightAuto: false,
                  icon: 'error',
                  title: '¡El Campo fecha esta vacio! 😭 ',
                  showConfirmButton: false,
                  timer: 3500
      
                })
                 console.log(<any>error.error)
               }
             )

           
          }
        }
      ]
    });

    await alert.present();
  }



miCita(){
  
}

async getAllPost(){
 


  setTimeout( async ()=>{
    let notes =  await this._userService.getOneCliente(this.identity._id).toPromise();
    
   this.notificacionView = notes.user;

  },5000)
 
}

// doSomethingOnWindowScroll(event){
//   console.log('yes',event)
// }

  exit(){
    setTimeout(()=>{ 
      localStorage.clear();
      this.identity = null;
      this.router.navigate(['/signup']);
    },1500)
  }
}
