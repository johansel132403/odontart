import { Component, OnInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  btnSumit(){
    const widget = document.querySelector<HTMLElement>('.star-widget')
    const post = document.querySelector<HTMLElement>('.post');

    widget.style.display = 'none';
    post.style.display = 'block';
    
    return false;

  }

  btnSumit02(){
    const widget = document.querySelector<HTMLElement>('.star-widget')
    const post = document.querySelector<HTMLElement>('.post');

    widget.style.display = 'block';
    post.style.display = 'none';
    
    return false;
  }
}
