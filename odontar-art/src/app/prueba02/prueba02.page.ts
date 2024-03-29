import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router,NavigationEnd } from '@angular/router'

import  io from 'socket.io-client';

import  * as canvas  from 'canvas';

import * as faceapi from 'face-api.js';
// import { truncateSync } from 'fs';
// import { domainToUnicode } from 'url';

import   Peer, { DataConnection }  from 'peerjs';  

const { Canvas, Image, ImageData } = canvas;

import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-prueba02',
  templateUrl: './prueba02.page.html',
  styleUrls: ['./prueba02.page.scss'],
})
export class Prueba02Page implements OnInit,OnDestroy  {
  public face;
  peer;
  roomID;
  otherPeer;
  public mediaConnection;
  uu;
 arr;    
 someSubscription: any;
  public sIo = io('https://odontart-production-da15.up.railway.app');


  faceDetectionOptions;

  constructor( public router: Router) {

   



    this.arr = ['Captura01.png','new.png','newb03.png','sonrisa.png'];    

    this.uu = uuidv4();
    
    const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
    const minConfidence = 0.5;
     this.faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });
 
    const REFERENCE_IMAGE = './bbt1.jpg';
    const QUERY_IMAGE = './bbt2.jpg';


    this.peer = new Peer(undefined, {
      path: "/peerjs",
    //  // host: 'localhost',
                //herokus services....
    //  host:'odontoart.herokuapp.com',
      host:'odontart-production-da15.up.railway.app',
      port: 443, //this port has given us heroes....
      secure: true
      
        // por lo visto tambien en el componente de videollamada hay un problema el cual pasa igual que aqui 
        // creo que tengo que actualizar el git para que se pueda ver la video llamada bien... ya que se esta usando otro servidor...
        // tenemos que revisar el repositorio de nuestro git en el socket porq creo que el peer(como se llame ) tiene la url del nuevo servidor 
        // mientras que en la page socket tiene otra, en conclucion creo que los servidores esta chocando por eso el video no se ve bien

     });
  }  
  elVideo;
   ngOnInit() {

    /////////////////////////////////////////////////////

    this.peer.on('open', (id) => {
      this.roomID = id;
      /*//////////////////////////////////////////////////////////////////////////**/    //colgar video

 

        this.peer.on("connection", (conn) => {  // listen for data connection here
     
      this.otherPeer = conn;
      conn.on("data", (data) => {
        if (data == "end") {
          conn.close();
          if (this.peer != null) {
            this.peer.destroy();
          }
         
        }
      });
    });
  })

    ////////////////////////////////////////////////////


    

    





   // const myVideo = document.createElement("video");
    // myVideo.className = 'video';
    // myVideo.style.height = "540px !important";
    // myVideo.style.width = "720px !important";
    // myVideo?.setAttribute('id', 'video');
    // myVideo.muted = true;
   this.elVideo = <HTMLVideoElement>document.getElementById('video')
   //console.log('vii',this.elVideo)
    // setTimeout(()=>{

    //   console.log(this.elVideo)
    // },4000)
    //  console.log(this.elVideo.width)
    //  console.log(this.elVideo.height)

    setTimeout(() => {

      navigator.mediaDevices.getUserMedia({   
        audio: true,
        video: true,
    })
    .then((stream:MediaStream) => {
     
    //    // this.myVideoStream = stream;
        this.addVideoStream(this.elVideo, stream);
 
                                        
      
 
    //    // peer              /*/*//////////////////////////////////
       this.peer.on("call", (call) => {
         this.mediaConnection = call;
        /// console.log('lop')
         
        call.answer(stream);
        const video = document.createElement("video");
        video.style.width = "720px";
        call.on("stream", (userVideoStream) => {
          //console.log('lop')
         this.addVideoStream(video, userVideoStream);
       
 
        });
      });

      this.uu = this.roomID;
      
      this.connectToNewUser(this.roomID, stream);

    this.sIo.on("user-connected", (userId) => {


      this.uu = userId;
      
       this.connectToNewUser(userId, stream);

     });
                                               //        comentario 1


     });
  
      
      var n = <any>navigator;
      n.getMedia  = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia)
      const cargarCamera = () => {
        n.getMedia(
            {
                video: true,
                audio: false
            },
            // stream => 
            // this.addVideoStream(myVideo,stream)
            ((stream)=>{
              this.addVideoStream(this.elVideo,stream),




              ///////////////////////////////////////////////

              this.peer.on("call", (call) => {
                this.mediaConnection = call;
                
               call.answer(stream);
               const video = document.createElement("video");
               call.on("stream", (userVideoStream) => {
                 this.addVideoStream(video, userVideoStream);
                                                                                     
        
               });
             });

              //////////////////////////////////////////////






              setTimeout(()=>{
                const videoGrid = document.getElementById("video-grid");
              
                this.elVideo.srcObject = stream;
                this.elVideo.addEventListener("loadedmetadata", () => {
                  this.elVideo.play();
                   videoGrid.append(this.elVideo);
                });
                setTimeout(()=>{
                  this.videoFunction()

                },3000)
               //  this.elVideo.srcObject = stream
              },2000)
            })
            ,
            console.error
        )
    }
    
    // Cargar Modelos
    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('../../assets/models'),
        faceapi.nets.ageGenderNet.loadFromUri('../../assets/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri('../../assets/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
      //  faceapi.nets.ssdMobilenetv1.loadFromUri('../../assets/models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
    ]).then(cargarCamera)
    
    }, 1000);
   
    // patch nodejs environment, we need to provide an implementation of
    // HTMLCanvasElement and HTMLImageElement    
    
      //   await faceapi.nets.ssdMobilenetv1.loadFromUri('../../assets/models')
      //   await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models')
      //   await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models')
      //   await faceapi.nets.ageGenderNet.loadFromUri('../../assets/models')
      //   await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models')
      //  // await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models')
      //   await faceapi.nets.faceLandmark68TinyNet.loadFromUri('../../assets/models')
      //  //  await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models')
      //    await faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models')
        
        
        
      //   faceapi.env.monkeyPatch({
          
      //     Canvas: HTMLCanvasElement,
      //     Image: HTMLImageElement,
      //     ImageData: ImageData,
      //     Video: HTMLVideoElement,
      //     CanvasRenderingContext2D: CanvasRenderingContext2D,
      //     createCanvasElement: () => document.createElement('canvas'),
      //     createImageElement: () => document.createElement('img')
      //   })
      // /  this.loadModels()
      //   setTimeout(()=>{
      //   //  this.po();  
      //   //    this.primeraFunction()
      // //  this.videoFunction()
      //   },1000)
        
  
  }


  ngOnDestroy() {
    console.log('Items destroyed');

   // document.getElementById('body').remove()
  //  location.reload()

  

  }

  referenceImage;
  async po(){
  //   const REFERENCE_IMAGE = '../../assets/img/carillas/rostro02.jpg';
  //   const QUERY_IMAGE = './bbt2.jpg';


  //    this.referenceImage = await loadImage(REFERENCE_IMAGE);
  //   const canvas = createCanvas(this.referenceImage.width, this.referenceImage.height, 'pdf');
  //   const ctx = canvas.getContext('2d')
  //         ctx.drawImage(this.referenceImage, 0, 0, this.referenceImage.width, this.referenceImage.height)
  // //  const queryImage = await canvas.default.loadImage(QUERY_IMAGE);

  // const detections_ref = await faceapi.detectSingleFace(this.referenceImage, this.faceDetectionOptions)
  //       .withFaceLandmarks()
  //       // .withFaceDescriptors();

  //       console.log(detections_ref)
  }
  
  videoFunction(){
    //this.elVideo = <HTMLVideoElement>document.getElementById('video')
       var myCanvas = <HTMLCanvasElement>document.getElementById("myCanvas")
       
     //  console.log('elVideo',myCanvas)
       this.elVideo = <HTMLVideoElement>document.getElementById('video')
       
       this.elVideo.videoHeight; 
       this.elVideo.videoWidth;
     //  console.log('video',this.elVideo.videoHeight)
   // const myCanvas = faceapi.createCanvasFromMedia(this.elVideo)
    // lo añadimos al body
    //document.body.append(canvas)

    // tamaño del canvas
    const displaySize = { width:  720, height: 540  }
    faceapi.matchDimensions(myCanvas, displaySize)

    // let domf =  document.getElementById('filters') ;
    //     domf.style.position = 'absolute';

    setInterval(async () => {
        // hacer las detecciones de cara
        const detections = await faceapi.detectAllFaces(this.elVideo, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions() // esta parte aqui tengo que cambiarla...
            

        try {
          let mouth1 =  detections[0].landmarks.positions.slice(48,49)
          let  mouth7 = detections[0].landmarks.positions.slice(55,56)
    
          const wx  = Math.abs(mouth1[0].x - mouth7[0].x) * 1.2;   
          // console.log('width',Math.floor(wx))  
    
          const wd = Math.floor(wx);
          document.getElementById('img').style.width = `${wx}px`
  
                  //////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////
          //          esta parte de codigo es para el rotate...
          // aqui se esta tomando la ubicacion de la cara....
          let point1 = detections[0].landmarks.positions.slice(0,1)
          let point17 = detections[0].landmarks.positions.slice(15,16)
        
          let x1 = point1[0].x;
          let y1 = point1[0].y;
          
          let x2= point17[0].x
          let y2= point17[0].y;
          
          let _m = (y2-y1)/(x2-x1)
          let rad = Math.atan(_m)  
          
          let ang = rad *(180/3.14) * (1);
        //  let ang = rad *(180/3.14)* (-1); con el menos uno toma otra posicion...
          /////////////////////////////////////////////////////////////
        //    console.log('hello02',ang)
        let img  = document.getElementById('img');
        //   img.style.rotate = `z ${ang}deg`
        img.style.rotate = `${ ang - 6 }deg`;   
  
  
  
  
  
  
  
  
  
  
  
  
      //  .withFaceDescriptors()
  
    // ponerlas en su sitio
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
  
    const lips =  detections[0].landmarks.positions.slice( 49, 55)
    // limpiar el canvas
    myCanvas.getContext('2d').clearRect(0, 0, myCanvas.width, myCanvas.height)
  
    const scale = this.elVideo.width / displaySize.width;
    // dibujar las líneas
   // faceapi.draw.drawDetections(myCanvas, resizedDetections)
  //  faceapi.draw.drawFaceLandmarks(myCanvas, resizedDetections)
  //  faceapi.draw.drawFaceExpressions(myCanvas, resizedDetections)
      const elementFilterEye = document.getElementById('filter-eye');
      elementFilterEye.style.left = `${lips[0].x * scale}px`;
      elementFilterEye.style.top = `${lips[0].y * scale}px`;
         // caja azul .........
    // resizedDetections.forEach(detection => {
    //     const box = detection.detection.box
    //     new faceapi.draw.DrawBox(box, {
    //     //    label: Math.round(detection.age) + ' años ' + detection.gender
    //     }).draw(myCanvas)
    // })
          
        } catch (error) {
          
        }

    })

  }


  
  
  ctx;
  //   imgagen....
//   async primeraFunction(){
//      const inputd = <HTMLImageElement>document.getElementById('myImg');
//      const input = faceapi.createCanvasFromMedia(<HTMLImageElement>document.getElementById('myImg'))
//   //   input.crossOrigin = "Anonymous";
//      console.log(input)

//     //  faceapi.detectSingleFace(input).then((value) :any => {
//     //   console.log(value)
//     //  }).catch((err) => { console.log(err) })
    
//     var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
//   //  document.body.append(canvas)
//   //   this.ctx = canvas.getContext('2d');

//     const displaySize = { width: inputd.width, height: inputd.height }
//     faceapi.matchDimensions(canvas, displaySize)

//       const detections = await faceapi.detectAllFaces(inputd).withFaceLandmarks().withFaceExpressions()
//       console.log(detections)
//       // const mouth = detections.landmarks.getMouth()
//       // console.log('boca',mouth)

//       // resize the detected boxes in case your displayed image has a different size than the original
// const resizedDetections = faceapi.resizeResults(detections, displaySize)
// // draw detections into the canvas
// // const box = { x: 50, y: 50, width: 100, height: 100 }
// // // see DrawBoxOptions below
// // const drawOptions = {
// //   label: 'Hello I am a box!',
// //   lineWidth: 2
// // }
// // const drawBox = new faceapi.draw.DrawBox(box, drawOptions)
// // drawBox.draw(canvas)
// // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

// // console.log('canvas',input.width,  input.height)

// // // // // dibujar las líneas
// faceapi.draw.drawDetections(canvas, resizedDetections)
//  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//  faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

// // // console.log('o',resizedDetections)




// /*////////////////////////////**////////////////////////////////////////////////// */

// // Detect Face
// // const input = <HTMLImageElement>document.getElementById("myImg");
// // const result = await faceapi
// //   .detectSingleFace(input, new faceapi.SsdMobilenetv1Options())
// //   .withFaceLandmarks()
// //   .withFaceDescriptor();
// // const displaySize = { width: input.width, height: input.height };
// // resize the overlay canvas to the input dimensions
// // const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

// // console.log('d',canvas)

// // faceapi.matchDimensions(canvas, displaySize);
// // const resizedDetections = faceapi.resizeResults(result, displaySize);
// // console.log(resizedDetections);

// //   Detect Face
 


// //   Recognize Face
// //   const labeledFaceDescriptors = await this.detectFace();
// //   const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);
// //   if (result) {
// //     const bestMatch = faceMatcher.findBestMatch(result.descriptor);
// //     const box = resizedDetections.detection.box;
// //     const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.label });
// //     drawBox.draw(canvas);
// //   }

// //  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)



//   }

//   async  detectFace() {
//     const label = "Huu";
//     const numberImage = 1;
//     const descriptions = [];
//     for (let i = 1; i <= numberImage; i++) {
//       const img = await faceapi.fetchImage(
//         `../../assets/img/carillas/rostro02.jpg`
//       );
//       const detection = await faceapi
//         .detectSingleFace(img)
//         .withFaceLandmarks()
//         .withFaceDescriptor();
//       descriptions.push(detection.descriptor);
//     }
//     return new faceapi.LabeledFaceDescriptors(label, descriptions);
//   }
                                    
//   async loadModels() {
//     const MODEL_URL = '../../assets/models'
//     Promise.all([
//       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//       faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
     
//   ]).then( async(val) => {
//      const input  = <HTMLImageElement>document.getElementById('myImg') ;
                               
//       // console here gives an array of undefined
//      await faceapi.detectSingleFace(input).then((value):any => {
//         console.log(value)
//        }).catch((err) => { console.log(err) });
//       console.log(val)
//   }).catch((err) => {
//       console.log(err)
//   })
// }

connectToNewUser(userId, stream)  {
   
                             
  const call = this.peer.call(userId, stream);


  this.mediaConnection = call;
 // this.thisPeer = this.peer.connect(userId);

  const video = document.createElement("video");
 
  call.on("stream", (userVideoStream) => {

   
   
    this.addVideoStream(video, userVideoStream);
  });

};

vii;
addVideoStream = (video, stream) => {

  //console.log('pol',stream)
     
  const videoGrid = document.getElementById("video-grid");

  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
     video.play();
     videoGrid.append(video);
     this.vii;
  });



};





// addVideoStream = (video, stream) => {
//   // this.elVideo.srcObject = stream
//   // const videoGrid = document.getElementById("video-grid");

//   // video.srcObject = stream;
//   // video.addEventListener("loadedmetadata", () => {
//   //    video.play();
//   //    videoGrid.append(video);
//   // });



// };




// pagination .......


    

      previuosss(){
        let value = JSON.parse(localStorage.getItem('currentPosition'))

      let currenPost = value + 1;

     if(currenPost >= 4){
        value = 0;
        currenPost =0;
     }

     localStorage.setItem('currentPosition',JSON.stringify(currenPost))
      value = JSON.parse(localStorage.getItem('currentPosition'))

   

    let v =   this.arr[value];

    console.log('v',v)
    let img = <HTMLImageElement>document.getElementById('img');

    img.src = `../../assets/img/carillas/${v}`

     
      }

      next(){
        let value = JSON.parse(localStorage.getItem('currentPosition'))

        let currenPost = value - 1;
          console.log('c',currenPost)
        if(currenPost <= -1){
            currenPost = 3;
        }
    
        localStorage.setItem('currentPosition',JSON.stringify(currenPost))
          value = JSON.parse(localStorage.getItem('currentPosition'))
         
      
    
       let v =   this.arr[value];
       let img = <HTMLImageElement>document.getElementById('img');
           img.src = `../../assets/img/carillas/${v}`
           console.log('v',v)
    
    
      }

      close(){

       

            console.log('asdf')
        var video = <HTMLVideoElement>document.getElementById("video");
     
        document.getElementById("video").style.display="none";
            video.pause()
          
            video.currentTime = 0;
        
    //  this.ngOnInit();
      //  this.router.navigate(['/inicio'])
      }
      
}
