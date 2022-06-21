import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../services/global';
import { UserServices } from '../services/user.services';


@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.page.html',
  styleUrls: ['./administradores.page.scss'],
})
export class AdministradoresPage implements OnInit, DoCheck {

  public users;
  public url;
  public searchbarr;

  constructor(private _userServices: UserServices, private _router:Router) { }

  ngOnInit() {

    this.url = Global.url;
      
    this._userServices.getAllUsers().subscribe(
      response=>{

        //aqui solo estamos obteniendo los usuarios que son admin....
        var myArray = response.users;
        var newArray = myArray.filter((item) => item.role !== 'Role_user');
        this.users = newArray;
     
  
        localStorage.setItem('setAdmins', JSON.stringify(newArray))
        
      
        // this.users = response.users;
        // for(var i = 0; i <= this.users.length -1; i++){
            
        //   let indexx = this.users[i].role.indexOf('Role_admin')
        //   let indexx02 = this.users[i].role.indexOf('Role_subadmin')

        //   if(indexx02 >= 0){
        //     this.users.splice( indexx02, 1 )
        //   }
          
        //   if(indexx >= 0) {
        //     this.users.splice( indexx, 1 )
        //   }
        // } 

        
        
      },
      err=>{
        console.log(<any>err)
      }
      )
      
    
        this.users = JSON.parse( localStorage.getItem('setAdmins'))
  
      
  }


  ngDoCheck(){

    // if(JSON.parse( localStorage.getItem('setAdmins'))){
    //   this.users = JSON.parse( localStorage.getItem('setAdmins'))

    // }
  }

  functionclick(){


    
    //aqui en el seach lo hacemos con el getElementById()
this.searchbarr = document.getElementById('ion-searchbar');


this.searchbarr.addEventListener('ionInput', this.handleInput);

}


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


funcionEnlace(id){
    
  this._router.navigate([`/admin/cliente/${id}`])
}


actualizarDatos(){
  this._userServices.getAllUsers().subscribe(
    response=>{

      //aqui solo estamos obteniendo los usuarios que son admin....
      var myArray = response.users;
      var newArray = myArray.filter((item) => item.role !== 'Role_user');
      this.users = newArray;
   
      localStorage.setItem('setAdmins', JSON.stringify(newArray))
      
    },
    err=>{
      console.log(<any>err)
    }
    )

}
  

doRefresh(event) {
  // let t =  document.querySelector('.refresher-refreshing-text') as HTMLElement ;
  // t.style.color = 'white';
  

  setTimeout(() => {
   
    event.target.complete();
  }, 2000);
  this.actualizarDatos()
    
}

}
