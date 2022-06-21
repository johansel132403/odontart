import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router'
import { Observable } from "rxjs";
import { UserServices } from "./user.services";


@Injectable()


export class UserGuard implements CanActivate{

    constructor(
         private _userServices: UserServices,
         private _router: Router
    ){}

    canActivate() {

        let identity = this._userServices.getIdentity()

        if(identity && (identity.role == 'Role_user' || identity.role == 'Role_subadmin' || identity.role == 'Role_admin')){
          
            return true;
        }else{
            this._router.navigate(['/signup']);
            return false;
        }
        
    }
}
