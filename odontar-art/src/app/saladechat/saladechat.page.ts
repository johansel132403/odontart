import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';
import  io from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saladechat',
  templateUrl: './saladechat.page.html',
  styleUrls: ['./saladechat.page.scss'],
  providers:[UserServices]
})
export class SaladechatPage implements OnInit {

  private users;
  private identity;
  private line;
  
  public sIo = io('https://odontoart.herokuapp.com');

  constructor(private userServices: UserServices,private router: Router) { }
  private value;
  ngOnInit() {
    
    
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
        

    this.userServices.getAllUsers().subscribe(
      response => {
        this.users = response.users;

        var myArray = response.users;
        var newArray = myArray.filter((item) => item.role === 'Role_subadmin' || item.role === 'Role_admin');
       
       // this.users = newArray;

        this.users = newArray.filter((item) => item.online === true );
       


        
        
      },error => {
        console.log(<any>error)
      }
    )
  }

  userFunction(user){

    this.router.navigate(['chat/'+`${user._id}`])
  }

}
