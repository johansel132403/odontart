import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AlertController } from '@ionic/angular';
import { CitaServices } from '../services/cita.services';

import { LoadingController } from '@ionic/angular';

import { fechaServicio } from '../services/fecha.servicio';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-micita',
  templateUrl: './micita.page.html',
  styleUrls: ['./micita.page.scss'],
  providers:[AlertController,CitaServices,UserServices],
})
export class MicitaPage implements OnInit {

  public citas =[];
  public letra;
  private citaUpdate;
  private  searchbarr;;  
  private  itemss;
  public  cita03;
  errorUpdate;
  identity;

  constructor(

    private alertController:AlertController,
    private _citaServices: CitaServices, 
    public loadingController: LoadingController,
    public _userServices: UserServices

  ) { }

  ngOnInit() {
    this.identity = this._userServices.getIdentity();
  
    let result =  this.getTodasCitas()
 
 
    if(result){
 
     result.then((element)=>{
      
       this.citas = element.citas;
       localStorage.setItem('micita',JSON.stringify(element.citas));
     })
 
    }
 
     //esto lo pongo aqui para que a la hora de que la pagina inicie ponga este sniper de paso y no se vea feo....
    this.loadingController.create({
     message: 'Cargando Datos...',
     duration: 1000
   }).then((response) => {
     response.present();
     response.onDidDismiss().then((response) => {
 
       let p  = JSON.parse(localStorage.getItem('micita')); 
      
       for(let i = 0; i < p.length; i++){
 
         document.querySelectorAll<HTMLInputElement>('.name')[i].innerHTML  = p[i].IdUser.nombre;
         document.querySelectorAll<HTMLInputElement>('.points')[i].innerHTML  = p[i].fecha;
        
       }
 
     });
   });
 
   }

  

  ngDoCheck(){

    //me quede por esta parte tengo que hacer el seach mejor ... y hacer el chat/.....
   

         // Esto lo tengo asi para que se pueda refrescar en la vista.....
         //aqui esto lo que me da es el NOMBRE de la persona que tiene la CITA y la fecha....
    let p  = JSON.parse(localStorage.getItem('micita'));
             localStorage.setItem('micita',JSON.stringify(p));

       


    // //liading logo.......


                                /* Comente esto aqui....*/            //OJO*

    // setTimeout(() => {
    //   for(let i = 0; i < p.length; i++){
    //     document.querySelectorAll<HTMLInputElement>('.name')[i].innerHTML  = p[i].IdUser.nombre;
    //     document.querySelectorAll<HTMLInputElement>('.points')[i].innerHTML  = p[i].fecha;
    //    // console.log('p,',p[i].IdUser.nombre)
    //   }

    // }, 1000);
  }

  async getTodasCitas(){
   

    // lo puedo hacer de las 2 forma con await o norma,
    //para hacerlo con await tengo que usar ( toPromise() )
    let response = await this._citaServices.getCitasDeUnId(this.identity._id).toPromise();
    // let f = await this._citaServices.getCitaWithUser().subscribe(
    //   response=>{
        console.log(response)
    localStorage.setItem('micita',JSON.stringify(response.citas))

          this.citas = response.citas;
          //  respuesta = response.citas;
//           },
//           error=>{
//             console.log(<any>error)
//           }

// )
// console.log('f',f)
//this.citas = response.citas;



return response;



}



editarCita(id){

  let fecha02 = fechaServicio();

  

  this._citaServices.getCitaOneUser(id).subscribe(
   async response =>{

      this.citaUpdate = response.cita;
                                                                          //me quede por aqui por la fecha aqui tengo que hace algo para que no diga Invalid Date... cuando voy a editar una imagen...
      if(this.citaUpdate.fecha === 'Invalid Date'){

        this.citaUpdate.fecha = 'Seleccione una fecha'
       }
       console.log(this.citaUpdate)

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Actualizar Datos',
        inputs: [
          {

            name: 'doctor',
            type: 'text',
            value: this.citaUpdate.doctor,
            placeholder: 'Nombre del Doctor'
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

            value:this.citaUpdate.fecha,

          },
         //


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
                 response=>{

                  console.log('error',response.error)

                   let arry = [];
                   let arry02 = [];

                     //Actualizar cita.....
                             // aqui lo que se actualizan la citas pero en la pagina del propio cliente (usuario)
                      arry = JSON.parse(localStorage.getItem('citas'))

                      for(let i in arry){

                         if( arry[i]._id == response.cita._id ){
                              arry[i] = response.cita
                         }
                      }
                             //aqui con este for lo que hacemso es actualizar la vista del todas las citas que tenemos en general
                             //para que se pueda ver actualizada en la vista
                      // arry02 = JSON.parse(localStorage.getItem('citauser'))

                      // for(let i in arry){

                      //    if( arry[i]._id == response.cita._id ){
                      //         arry[i] = response.cita
                      //    }
                      // }

                     localStorage.setItem('citauser',JSON.stringify(arry));

                     localStorage.setItem('citas',JSON.stringify(arry));

                     //llamamos esto para que refresque la vista.....
                     this.getTodasCitas();

                     Swal.fire({
                       heightAuto: false,
                       icon: 'success',
                       title: 'Datos actualizados',
                       showConfirmButton: false,
                       timer: 2300

                     })

                   //this.llamada();

                  },
                 error=>{
                   console.log('Error02',<any>error)
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

     console.log('Error03',<any>error)

   }


 )

}




//este metodo nos sirve para ver los datos, informarnos....
public  cita02;
  async presentAlertMultipleButtons(id) { 

    let arry;


      //Actualizar cita.....
              // aqui lo que se actualizan la citas pero en la pagina del propio cliente (usuario)
       arry = JSON.parse(localStorage.getItem('micita'))

       for(let i in arry){

          if( arry[i]._id == id ){
             this.cita02 =   arry[i]
          }
       }
         console.log(this.cita02)
          const alert = await this.alertController.create({
            cssClass: 'my-custom-alert',
            header: 'Informacion de la cita',
            subHeader: `Nombre: ${this.cita02.IdUser.nombre}`,
            message: `<strong>Dr/Dra:</strong> ${this.cita02.doctor} <br> <br>`+'La cita de ' + this.cita02.IdUser.nombre +  ' es ' + `<strong>${ this.cita02.fecha }</strong>. <br> <br> <strong>Nota</strong>:${this.cita02.descripcion}`,
            buttons: ['Cancel']
          });

          await alert.present();






    }


    
     functionclick(){
      this.searchbarr = document.querySelector('ion-searchbar');
      this.searchbarr.addEventListener('ionInput', this.handleInput);
     }
  
    
            //este codigo es bueno que lo analice esta muy bueno........ el (functionclick) va junto.....
     handleInput(event) {

      let arrayList = [];
      arrayList =  Array.from(document.querySelector('ul').children);
      
      
      const query = event.target.value.toLowerCase();
    
      requestAnimationFrame(() => {

         
        arrayList.forEach((item) => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
         
          item.style.display = shouldShow ? 'flex' : 'none';
        });
      });
    }




  //borrar una cita

  deleteCita(id){

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
        timer: 2200

      })
      this._citaServices.DeleteCitas(id).subscribe(
        response=>{
          console.log(response)
          
         // this.getcitasDelCliente(this.paramsIdCliente)
         this.getTodasCitas();
        },
        error=>{

          if(error.error.Error){
            this.errorUpdate = true;
            
          }
          setTimeout(() => {
            this.errorUpdate = false;
          }, 5000);
          console.log('err05',<any>error.error.Error)
        }
      )

    }
  })


  }

}
