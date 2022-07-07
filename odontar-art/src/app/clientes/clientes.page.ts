import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../services/global';
import { UserServices } from '../services/user.services';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit, DoCheck {

  public users;
  public url;
  public searchbarr;
 

  constructor(private _userServices: UserServices, private _router:Router) {

    this.url = Global.url;
    
  
   }

  ngOnInit() {

    this.clientes();
    
   
    
  }

  clientes(){
    this._userServices.getAllUsers().subscribe(
      response=>{

         //aqui solo estamos obteniendo los usuarios que son Role_user....
         var myArray = response.users;
         var newArray = myArray.filter((item) => item.role !== 'Role_admin' && item.role !== 'Role_subadmin');
         this.users = newArray;
         

        
        // this.users = response.users;
        // for(var i = 0; i <= this.users.length; i++){
            
        //   let indexx = this.users[i].role.indexOf('Role_admin')
        //   let indexx02 = this.users[i].role.indexOf('Role_subadmin')

        //   if(indexx02 >= 0){
        //     this.users.splice(indexx02,1)
        //   }
          
        //   if(indexx >= 0) {
        //     this.users.splice(indexx,1)
        //   }
        // }
         localStorage.setItem('users',JSON.stringify(response.users))
       
        //  console.log(this.users)

      },
      err=>{
        console.log(<any>err)
      }
    )
  }

  ngDoCheck(){
      //console.log('asdf')
      //  this.users = JSON.parse(localStorage.getItem('users'))
   
  }




// esto lo hago para no poner una etiqueta (a), me daña el ccs 
  funcionEnlace(id){
    
    this._router.navigate([`/admin/cliente/${id}`])
  }
  
  functionclick(){


    
                               //aqui en el seach lo hacemos con el getElementById()
    this.searchbarr = document.getElementById('ion-searchbar');
    

    this.searchbarr.addEventListener('ionInput', this.handleInput);
    
   }

           // ESTE ES EL METODO SEACH.....
          //este codigo es bueno que lo analice esta muy bueno........ el (functionclick) va junto.....
   handleInput(event) {
  
    let arrayList = [];
     
    arrayList =  Array.from(document.querySelector('ion-list').children);
   

    const query = event.target.value.toLowerCase();
  
    requestAnimationFrame(() => {
       
      arrayList.forEach((item) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
       
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });

  }

  doRefresh(event) {
    // let t =  document.querySelector('.refresher-refreshing-text') as HTMLElement ;
    // t.style.color = 'white';
    

    setTimeout(() => {
      
      event.target.complete();
    }, 2000);
   this.clientes();
  }

}
