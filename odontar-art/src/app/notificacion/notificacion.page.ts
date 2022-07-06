import { Component, OnInit } from '@angular/core';
import { Notificacione } from '../model/notificaciones';
import { Global } from '../services/global';
import { uploadImagen } from '../services/uploadImage';
import { UserServices } from '../services/user.services';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PostPage } from '../post/post.page';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
  providers:[uploadImagen,UserServices,PostPage]
})
export class NotificacionPage implements OnInit {

  public notificacion: Notificacione;
  uploadFile;
  btn;
  url;
  identity;
  token;
  constructor(private _post: PostPage,private _router:Router,private _uploadimagen:uploadImagen, private _userServices:UserServices) { }
  
  ngOnInit() {
    this.notificacion = new Notificacione('','','','','',false,'');
    this.url = Global.url;
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken()
  }

  saveNota(){
   
    let element = {
      notificacionView: false
  }
    this._userServices.updateNoteView(element).toPromise(); //esta linea de codigo es de lo que estamos hablando de la actualizacion....
    setTimeout(() => {
      
    }, 1000);

    this._userServices.savenota(this.notificacion).subscribe(
 async response =>{


      console.log(response.response)

        if(response.response._id){

          //aqui lo que estamos haciendo que cuando publiquemos una notificacion se le va a poner en false a la persona que no lo ha visto hasta que lo vea....
          
           

          Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: '¡Notificación creada!',
            showConfirmButton: false,
            timer: 3000

          })

      
        }

        setTimeout(() => {

              console.log(this.uploadFile )
          
              if(this.uploadFile && this.uploadFile.length >= 0){
                let  barraProgress = document.getElementById('barra');
          
                console.log('entrooo')
                this.btn = false;
       
               
                  
                  this._uploadimagen.subirImagen(this.url+'imagennota/'+response.response._id,[],this.uploadFile,this.token,'imagen')
                  .then((value:any)=>{
                    
                        console.log('df',value)
                    document.querySelector<HTMLInputElement>("#upload").value ='';
                });
             
          
          }
        }, 2500);

      },
      err => {
        console.log(<any>err)
      }
    )

    
    let textarea = document.getElementById('exampleFormControlTextarea1') as HTMLInputElement;
    textarea.value = '';
    let elements = document.querySelectorAll<HTMLInputElement>("input[type='text']");
    elements.forEach((val) => {
      val.value = '';
    });
  }


  uploadImagenInput(inputFile:any){
    
    this.uploadFile = <Array<File>>inputFile.target.files;

  }

  verNotificacion(){
   
    this._router.navigate(['/admin/post']);
  }


 


}
