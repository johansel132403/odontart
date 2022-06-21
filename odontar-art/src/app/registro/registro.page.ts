import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../model/userModel';

import { UserServices } from '../services/user.services';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers: [UserServices]
})
export class RegistroPage implements OnInit {

  public title:String;
  public user: User;
  public status: boolean;
  public erro: String;
  public statusSuccess: String

  constructor( private router:Router, private route: ActivatedRoute, private _userServices: UserServices) {
    
    this.title = 'Registro';
    this.user = new User('','','','','','','','Role_user','','','',null,null,null,'','','');
  }

  ngOnInit() {
    
  }

  onSubmit(form){

    
    let user = Object.assign(this.user,{role:'Role_user'})
    console.log(this.user)



    this._userServices.registro(user).subscribe(
      response => {
    console.log('this.user',response)

        
        if(response.user && response.user._id){

          this.status = true;
          this.statusSuccess = 'EN HORA BUENA! YA ESTAS REGISTRADO';

              setTimeout(()=>{
                
                this.status = null;
                this.router.navigate(['/signup']);
                
              },2700);

              form.reset();
          
          this.status = true;
        }else{
         
          this.status = false;
          this.erro = response.Mensaje;
        }

      },
      error => {

      }
    )
  
  }

}
