import { Component, OnInit } from '@angular/core';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Global } from '../services/global';
import { UserServices } from '../services/user.services';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  providers: [UserServices]
})
export class GalleryPage implements OnInit {

identity;
imagenes = [];
resImagen
url;

  constructor(private photoviewer: PhotoViewer, private _userServices: UserServices ) { 
    this.url = Global.url;
  }


  //  imagenes = [
  //   {
  //      img: "../../assets/img/yt.jpg"
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
       
  //   },
    
   

  // ]

 // imgg: string

  ngOnInit() {


    // this.imagenes;

    // console.log(this.imagenes)

  //  this.imagenes = "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80";

  
//this.photoviewer.show('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png');

//this.photoviewer.show('https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80', 'My image title', {share: false});

//this.photoviewer.show('data:image/jpeg;base64,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', 'My image title', {share: false, headers: '{username:foo,password:bar}'});
//   }


//   imagen(){
//     this.photoviewer.show('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png');
// }

this.identity = this._userServices.getIdentity();

this.getImg();

}


async getImg(){
  
 let response = await this._userServices.getImagenFromCh(this.identity.email).toPromise();
  console.log(response.response);
 

   this.resImagen = response.response;

   let re = this.resImagen.filter((val)=> val.imagen )
   this.imagenes = re;

   console.log(this.imagenes)
  }

  imagenOpen(img2){
   // console.log(img2);
    let img = document.getElementById('myImg');
//    console.log("img",img);


    var modal = document.getElementById("myModal");
 //   console.log("moda",modal);

    var modalImg = document.getElementById("img01") as HTMLImageElement | null;
  //  console.log("modalImg",modalImg);

    var captionText = document.getElementById("caption");
  //  console.log("captionText",captionText);

      
     //   modal.style.display = "block";
        modal.style.display = "block";    
     //   modal.style.overflow = "hidden"; 

     let f01 = img.getAttribute('src');
     let f02 = f01.split('/');
     let f03 = f02[f02.length -1] = img2;

  //   console.log(f03)
     
   //  console.log(img.getAttribute('src'))

        modalImg.src = this.url+'getimagen/'+img2;
        captionText.innerHTML = img.getAttribute('alt');



  }

  
// y este es para cerrar la imagen
exitImagen(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

  inputOptions(){
  return   new Promise((resolve) => {
   setTimeout(() => {
     resolve({
       '#ff0000': 'Red',
       '#00ff00': 'Green',
       '#0000ff': 'Blue'
     })
   }, 1000)
 })
  }

}
