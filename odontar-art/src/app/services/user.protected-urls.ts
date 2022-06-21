import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router"
import { UserServices  } from "./user.services";


@Injectable()


export class UserProtedurls{
      constructor(
          private _router:Router,
          private _userServices: UserServices
      ){}


      canActivate(){

        let identity = this._userServices.getIdentity();

        if(identity.role === 'Role_user'){
            
            this._router.navigate(['/inicio']);
            return false;

        }else if(identity.role == 'Role_admin' || identity.role == 'Role_subadmin'){
            
            return true;
        }else{
            return false
        }
      }


}