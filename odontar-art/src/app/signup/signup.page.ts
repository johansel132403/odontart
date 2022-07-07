import { Component, OnInit } from '@angular/core';
import { UserServices  } from '../services/user.services';

import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../model/userModel';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [UserServices]
})
export class SignupPage implements OnInit {

  public user: User;
  public token;
  public identity;
  public status;
  public status_error;

  constructor(
    public loadingController: LoadingController,
    private _userServices: UserServices,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.user = new User('','','','','','','','Role_user','','','',null,null,null,'','','');
   }

  ngOnInit() {
  //  let date = new Date();

  // var time = new Date();
  // var hour = time.getHours();
  // var minute = time.getMinutes();
  // var second = time.getSeconds();
  // var temp = '' + ((hour > 12) ? hour - 12 : hour);
  // if (hour == 0)
  //   temp = '12';
  // temp += ((minute < 10) ? ':0' : ':') + minute;
  // temp += ((second < 10) ? ':0' : ':') + second;
  // temp += (hour >= 12) ? ' P.M.' : ' A.M.';

  //   var fecha = new Date();
  //         let   fechaf = fecha.toLocaleDateString("es-MX",{ weekday:'long', day:'numeric', month:'long', year:'numeric' });
  //               console.log(fechaf +', '+ temp);
  }

  async loginSubmit(form){

    

 
    
     this._userServices.loginn(this.user,null).subscribe(
      response => {
       
       // aqui tenemos que hacer un arreglo a la hora de de que se salga del login tenemos que actualizar el token y ponerlo false para que pueda retornarno un response con datos 
       //                                imprimamos estos login para que podamos ver lo que retorna 
      

       
       for(let ress in response){
         
         
         
         
         if(response[ress] && response[ress]._id){



          // //esto aqui es para la hora en la que se registran los usuarios admin...
              if(response[ress].role === 'Role_subadmin'){

                var time = new Date();
                var hour = time.getHours();
                var minute = time.getMinutes();
                var second = time.getSeconds();
                var temp = '' + ((hour > 12) ? hour - 12 : hour);
                    if (hour == 0)
                      temp = '12';
                    temp += ((minute < 10) ? ':0' : ':') + minute;
                    temp += ((second < 10) ? ':0' : ':') + second;
                    temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  
                var fecha = new Date();
                let   fechaf = fecha.toLocaleDateString("es-MX",{ weekday:'long', day:'numeric', month:'long', year:'numeric' });
                     
  
    
                  //aqui le podemo poner un await pero preferimos ponerle este setTimeout()......
                  setTimeout(()=>{
                    this._userServices.updateData02(response[ress]._id, {fecha_entrada:`${fechaf}   ${ temp} `} ).subscribe(
                        responsei=>{
                         
                        },
                        error => {
                          console.log(error)
                        }
                      )
              
                  },2500)

              }


              

              

              this.identity = response.user;

              
              
              localStorage.setItem('identity',JSON.stringify(this.identity));
              this.getToken(form)
              
              
              //liading logo.......
               this.loadingController.create({
                  message: 'Iniciando seccion...',
                  duration: 3500
                }).then((response) => {
                  response.present();
                  response.onDidDismiss().then((response) => {
                   
                    if(this.identity.role === 'Role_admin' || this.identity.role === 'Role_subadmin'){
                       localStorage.setItem('identity',JSON.stringify(this.identity));

                      this._router.navigate(['/admin']);
                       return true;
                  }else{
                    this._router.navigate(['/inicio']);
                    
                  }
                });
              });
              
             
            }
      }
     },
     error => {

     
       if(error.error.Mensaje == 'El usuario no esta registrado' || error.error.Mensaje == 'Contraseña invalida'){
         this.status_error = true;
         this.status = error.error.Mensaje;

       }

      setTimeout(()=>{
      this.status_error = false;
          
      },2500)
      
      

     }
   )

  }


  getToken(form){

    this._userServices.loginn(this.user,'true').subscribe(
      response=> {

       
        
          this.token = response.token;
          localStorage.setItem('token', JSON.stringify(this.token));
      },
      error => {
        console.log(<any>error);

      }
    )
    // me quede por aqui 
    form.reset()
 
  }
    

}
