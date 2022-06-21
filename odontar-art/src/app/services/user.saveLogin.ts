import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { UserServices } from './user.services';



@Injectable()


export class SaveLogin{
    constructor(
        private _router:Router,
        private _Usuario:UserServices
        ){


    }
 // En este caso lo que estamos haciendo aqui es de que cuando el usuario este loginado en la pagina 
 // y navegando en ella no pueda volver otra vez al login por que ya esta logiado, entonce lo que estamos haciendo es dirigiendolo al  home 
    canActivate(){
        //este GetIdentity viene del Usuario..
        let identity = this._Usuario.getIdentity()

        
        if(identity && (identity.role == 'Role_subadmin' || identity.role == 'Role_admin')){

            
             this._router.navigate(['/admin']);
             return false;

        }else if(identity && (identity.role == 'Role_user')){
            this._router.navigate(['/inicio']);
             return false;
        }
        else{
          
            // this._router.navigate(['/signup']);

                return true;
            
        }

    }
}