import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/userModel';
import { UserServices } from '../services/user.services';

@Component({
  selector: 'app-crearadmin',
  templateUrl: './crearadmin.page.html',
  styleUrls: ['./crearadmin.page.scss'],
  providers: [UserServices]
})
export class CrearadminPage implements OnInit {

 
  public title:String;
  public user : User;
  public status: boolean;
  public erro: String;
  public statusSuccess: String
  constructor(private _userServices: UserServices, private router:Router) { }

  lists;

  ngOnInit() {
    
   this.lists = [
     {
     role:'Role_subadmin',
    },
    {
      role:'Role_admin'
    }
  ]
 
    this.user = new User('','','','','','','','','','','',null,null,null,'','','');
  
  }
  
  onSubmit(form){
    console.log(this.user)

    // let value = {
    //   activo: true
    // }

    // Object.assign(this.user, value);
   
   

    this._userServices.registro(this.user).subscribe(
      response => {

      // 


      //  console.log(response.user )
      //   if(response.user.activo === null || response.user.activo === false){
      //       console.log('si esta entrando')
          
      //     let f = this._userServices.updateData(response.user._id,value).toPromise;
      //     console.log(f)
      //   }

        
        if(response.user && response.user._id){

          this.status = true;
          this.statusSuccess = 'EN HORA BUENA! YA ESTAS REGISTRADO ESTE USUARIO ';

              setTimeout(()=>{
                
                this.status = null;
              
                
              },2700);

              form.reset();
          
          this.status = true;

          this._userServices.getAllUsers().subscribe(
            response=>{
      
              //aqui solo estamos obteniendo los usuarios que son admin....
              //luego lo guardamos en el localStorage para poder actualizarlo en dicha pagina...
              var myArray = response.users;
              var newArray = myArray.filter((item) => item.role !== 'Role_user');
             
                localStorage.setItem('setAdmins', JSON.stringify(newArray))
               
            },
            err=>{
              console.log(<any>err)
            }
          )
        }else{
         
          this.status = false;
          this.erro = response.Mensaje;
          setTimeout(()=>{
                
            this.status = null;
          
            
          },2700);

        //  form.reset();
        }

      },
      error => {

        console.log(error)

      }
    )

  }

}
