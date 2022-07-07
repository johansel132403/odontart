import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { routing } from '../app-routing';
import { UserServices } from '../services/user.services';

import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  providers: [UserServices]
})
export class AdminPage implements OnInit {

  identity;
  Id;
  role;
  
  constructor(private router: Router, private _userServices: UserServices,private menu: MenuController) {
    
    
   
    // router.navigate(['/admin/client'])
  }

  ngOnInit() {
    

    this.identity = this._userServices.getIdentity();
    this.Id = this.identity._id;
    this.role = this.identity.role;
   }

  async exitSesion(){


      // //esto aqui es para la hora en la que se registran los usuarios admin...
      if(this.role === 'Role_subadmin'){

       

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
            this._userServices.updateData03(this.Id, {fecha_salida:`${fechaf}   ${ temp} `} ).subscribe(
              responsei=>{
                
              },
              error => {
                console.log(error)
              }
              )
              
            },1000)

      }
         // actualice esto aqui para estrando el router dentro del setTimeout...
      setTimeout(()=>{ 
        
        localStorage.clear();
        this.identity = null;
        this.router.navigate(['/signup']);
      },1500)
      


  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
