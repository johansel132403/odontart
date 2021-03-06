import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { UserServices } from '../services/user.services';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  providers:[UserServices]
})
export class PostPage implements OnInit {

  notes;
  url;
  identity;
  constructor( private _userServices:UserServices ) { 
    
  }

  ngOnInit() {




    this.getAllNote();
    this.url = Global.url;
    this.identity = this._userServices.getIdentity();
   
    // este metodo es para que cada vez que entremos a ver una publicacion que no hayamos visto se actualize nuestra bd.....
     this._userServices.updateNoteView02(this.identity._id).toPromise();
     

  }

  async getAllNote(){
   let notes =  this._userServices.getAllNote().toPromise();

   notes.then((val) => {
    this.notes = val.response;
    
   })
  }

  imagenOpen(image){
    let img = document.getElementById('myImg');

    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01") as HTMLImageElement | null;
    var captionText = document.getElementById("caption");
      
     //   modal.style.display = "block";
        modal.style.display = "block";    
     //   modal.style.overflow = "hidden";    

   //  modalImg.src = img.getAttribute('src');
     modalImg.src = image;
        captionText.innerHTML = img.getAttribute('alt');



  }

  // y este es para cerrar la imagen
  exitImagen(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }


  deleteNote(id){


    Swal.fire({
      heightAuto: false,        
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
     cancelButtonColor: '#3085d6',
     confirmButtonText: 'Si, Eliminar !'
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire({
        heightAuto: false,
        icon: 'success',
        title: 'Este dato se elimino',
        showConfirmButton: false,
        timer: 1500
        
      })
      // metodo delete
      let note =  this._userServices.deleteNote(id).toPromise();
    
      note.then((val) => {
      
        if(val.mensaje){
         this.getAllNote();
        }
    
      })

    }
  })

  }




  doRefresh(event) {
    // let t =  document.querySelector('.refresher-refreshing-text') as HTMLElement ;
    // t.style.color = 'white';
   

    setTimeout(() => {
     
      event.target.complete();
    }, 2000);
   this.getAllNote();
  }


}
