import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarioadmin',
  templateUrl: './usuarioadmin.page.html',
  styleUrls: ['./usuarioadmin.page.scss'],
  providers:[UserServices]
})
export class UsuarioadminPage implements OnInit {

  public user;

  constructor( private _usersServices: UserServices) {
    
   }

  ngOnInit() {
   //this.user = this._usersServices.getIdentity()
 

   let usuario =  this._usersServices.getIdentity();

   let user02 = this._usersServices.getOneCliente(usuario._id).toPromise();

   user02.then((item) => {
    
    this.user = item.user;
    localStorage.setItem('identity',JSON.stringify(this.user))
    
   })

  }

  actualizarDatos(){

   let identity =  this._usersServices.updateData(this.user._id,this.user).toPromise();
    
   identity.then((response) =>{

    let res = response.user;

    Swal.fire({
    
      icon: 'success',
      heightAuto: false,
      title: '!Datos actualizados!',
      showConfirmButton: false,
      timer: 2000
    })

    localStorage.setItem('identity',JSON.stringify(res))
    

   })


  }

}
