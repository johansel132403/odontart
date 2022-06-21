import { Component, OnInit } from '@angular/core';

import { DatosServios } from '../services/servicio.services';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

   services: any[];
  //aqui hay que agregar los servicios ....
  constructor(private servic: DatosServios) {

    
  }
  
  ngOnInit() {
    this.services = this.servic.getServicios();
   
  }

}
