import { Component, OnInit,DoCheck } from '@angular/core';
import { UserServices } from '../services/user.services';
import  io from 'socket.io-client';
import { User } from '../model/userModel';
import { Router } from '@angular/router';
import { Global } from '../services/global';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
@Component({
  selector: 'app-chatsadmin',
  templateUrl: './chatsadmin.page.html',
  styleUrls: ['./chatsadmin.page.scss'],
  providers:[UserServices]
})
export class ChatsadminPage implements OnInit,DoCheck {

  
  private users;
  private identity;
  private line;
  url;
  public sIo = io('https://odontoart.herokuapp.com');
  
  constructor( private userServices: UserServices,private router: Router) {

    this.url = Global.url;
   }

  
  private value;
  
  ngOnInit() {

    this.getAlluser();

    const clicks = fromEvent(window, 'scroll',{ capture: true });
    const result = clicks.pipe(auditTime(3000)); 
    result.subscribe(x => 
      //aqui llamamos las notificaciones...
    
      this.getAlluser()
      
      );


   
    
  
    
    this.identity = JSON.parse(localStorage.getItem('identity'));

    this.sIo.on('yess', data => {
     
    })
   
    let dato= {
      data:{
        role:'Role_admin'
      }
    }
/**//////////////////////////////////////////////////////////////////////////////////////////////// */
    // //esto es para online del admin....
  //   this.sIo.emit('admin-conenct',dato)
     this.sIo.on('update02',(datosp) =>{
       this.value = datosp;
      
     })

     this.sIo.on('update03',(dato)=>{
       this.value = dato;
       
     })
    
/*/////////////////////////////////////////////////////////////////////////////////////////////////*/
        
    // let datos = {
     
    //   nombre: 'o@hotmail.com',
    //   emisor: this.identity.email,
    //   receptor: 'o@hotmail.com',
    //   role: 'Role_user',
    // }
    
    // if(this.identity.role === 'Role_admin'){
    
    //   datos = {
          
    //       nombre:"ines@hotmail.com",
    //       emisor: this.identity.email,
    //       receptor: 'ines@hotmail.com',
    //       role: 'Role_admin',
    //   }
    // }

    // this.sIo.emit('admin-conenct', datos,datos.receptor)
    // this.sIo.emit('send online', datos,datos.receptor)
    // this.sIo.on('online',ele => {
    //   console.log(ele)
    // })






    
    //     this.identity = this.userServices.getIdentity();
    //     console.log(this.identity)

    //    this.sIo.on( 'online02', el =>{
         
    //    })
    // //estoy llegueando esto para ver los usuarios que estan online.....
   
    // this.sIo.emit('admin-conenct',this.identity.email)

    // this.sIo.on('online023',(element02) =>{
    //   console.log(element02)
    //   this.line = element02;
    //   console.log(this.line)
    // })

    // console.log(this.line)



    
      // this.sIo.on('offline',(element) => {
      //   this.line = element;
      //   console.log(this.line)
    

      // })




    

   
  }


  ngDoCheck(){
    
    
  }


  getAlluser(){
    this.userServices.getAllUsers().subscribe(
      response => {
        this.users = response.users;

        var myArray = response.users;
        var newArray = myArray.filter((item) => item.role !== 'Role_subadmin' && item.role !== 'Role_admin');
       
        this.users = newArray;


        
        
      },error => {
        console.log(<any>error)
      }
    )
  }

  userFunction(user){

    this.router.navigate(['/chat/'+`${user._id}`])

    
  }


  
    esp(v){
    
  
  }

  updateData01(){
    this.userServices.getAllUsers().subscribe(
      response => {
        this.users = response.users;

        var myArray = response.users;
        var newArray = myArray.filter((item) => item.role !== 'Role_subadmin' && item.role !== 'Role_admin');
       
        this.users = newArray;


        
        
      },error => {
        console.log(<any>error)
      }
    )
  }
  



  doRefresh(event) {
    // let t =  document.querySelector('.refresher-refreshing-text') as HTMLElement ;
    // t.style.color = 'white';
   

    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
    this.updateData01()
  }

    
}
