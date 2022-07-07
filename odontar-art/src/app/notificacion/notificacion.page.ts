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
  imgAlert;
  alert;
  constructor(private _post: PostPage,private _router:Router,private _uploadimagen:uploadImagen, private _userServices:UserServices) { }
  
  ngOnInit() {
    this.notificacion = new Notificacione('','','','','',false,'');
    this.url = Global.url;
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken()
  }

  saveNota(){
   
    
    this._userServices.savenota(this.notificacion).subscribe(
 async response =>{
   

  
   
   if(response.response._id){
     
     //aqui lo que estamos haciendo que cuando publiquemos una notificacion se le va a poner en false a la persona que no lo ha visto hasta que lo vea....
     let element = {
       notificacionView: false
   }
 
       this._userServices.updateNoteView(element).toPromise(); //esta linea de codigo es de lo que estamos hablando de la actualizacion....
       
    
          
           

          Swal.fire({
            heightAuto: false,
            icon: 'success',
            title: '¡Notificación creada!',
            showConfirmButton: false,
            timer: 3000

          })

      
        }

        setTimeout(() => {

              
          
              if(this.uploadFile && this.uploadFile.length >= 0){
                let  barraProgress = document.getElementById('barra');
          
                
                this.btn = false;
       
               
                  
                  this._uploadimagen.subirImagen(this.url+'imagennota/'+response.response._id,[],this.uploadFile,this.token,'imagen')
                  .then((value:any)=>{
                    
                        
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

   

    let form = this.uploadFile[0].name.split('.');
    let formt = form[form.length -1];
     

       if( formt == 'jpg' || formt == 'JPG'  || formt == 'png'  || formt == 'GIF' ||
           formt == 'PNG' || formt == 'jpeg' || formt == 'JPEG' || formt == 'gif' || formt == 'jfif' || formt == 'jfi' || formt == 'jif'){ 

            this.imgAlert = true;

            setTimeout(() => {
              this.imgAlert =false;
            }, 3000);

            console.log('IMG')
        }else{
          document.querySelector<HTMLInputElement>("#upload").value ='';
          this.alert = true
          setTimeout(() => {
            
            this.alert = false;
            
          }, 3000);


        }


  }

  verNotificacion(){
   
    this._router.navigate(['/admin/post']);
  }


 


}
