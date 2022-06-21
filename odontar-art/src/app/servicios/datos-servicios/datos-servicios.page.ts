import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ServiceModel } from 'src/app/model/service.model';

import { DatosServios } from '../../services/servicio.services';


@Component({
  selector: 'app-datos-servicios',
  templateUrl: './datos-servicios.page.html',
  styleUrls: ['./datos-servicios.page.scss'],
})
export class DatosServiciosPage implements OnInit {



  constructor( private activatedroute: ActivatedRoute, private datosServices: DatosServios ) { }

   data: any;
  ngOnInit() {
   
    this.activatedroute.paramMap.subscribe(params => {
      let param = params.get('servicioId')
      
      let serv = this.datosServices.getServicio(param)
     this.data = serv[0];
    
    });


  }

}
