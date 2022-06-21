import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cepillado',
  templateUrl: './cepillado.page.html',
  styleUrls: ['./cepillado.page.scss'],
})
export class CepilladoPage implements OnInit,OnDestroy {

  public progres = 0;
   refreshInterval;
   time = 33;
   btn_function =  true;
   song;
   time01;
   time02;
   time03;
   time04;
   time05;
   time06;

   constructor( private router:Router) { 
     this.song = new Audio('../../assets/song/song01.mp3');
     this.song.volume = 0.2;
    }
    
    ngOnInit() {}
    
    ngOnDestroy(){
    
      this.song.currentTime = 0; 
      this.song.pause();
   
      clearTimeout(this.time01);
      clearTimeout(this.time02);
      clearTimeout(this.time03);
      clearTimeout(this.time04);
      clearTimeout(this.time05);
      clearTimeout(this.time06);

  }

 
  functionButton(){
   
        this.song.load();
        this.song.play();
   
    document.getElementById('img01').style.visibility = 'visible';

    this.time01 =  setTimeout(()=>{
      document.getElementById('img01').style.visibility = 'hidden';
      document.getElementById('img02').style.visibility = 'visible';
      
     },10000)

    this.time02 =  setTimeout(()=>{
      document.getElementById('img02').style.visibility = 'hidden';
      document.getElementById('img03').style.visibility = 'visible';
     
     },20000)
    this.time03 =  setTimeout(()=>{
      document.getElementById('img03').style.visibility = 'hidden';
      document.getElementById('img04').style.visibility = 'visible';
     
     },30000)

    this.time04 = setTimeout(()=>{
      document.getElementById('img04').style.visibility = 'hidden';
      document.getElementById('img05').style.visibility = 'visible';
     },40000)

    this.time05 = setTimeout(()=>{
      document.getElementById('img05').style.visibility = 'hidden';
      document.getElementById('img06').style.visibility = 'visible';
     },50000)

    this.time06 = setTimeout(()=>{
      document.getElementById('img06').style.visibility = 'hidden';
      this.song.currentTime = 0; 
      this.song.pause();
     
     },60000)

    this.time = 120;
    this.btn_function = false;
     
    this.refreshInterval = setInterval(()=>{
    this.time = this.time - 2;
    this.progres += 0.02;
          if(this.time <= 0 ){
            this.btn_function = true;
            this.time = 0;
            this.progres  = 0;
            clearInterval(this.refreshInterval)

          }
        },1000)

  }

}
