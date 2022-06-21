import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosServiciosPageRoutingModule } from './datos-servicios-routing.module';

import { DatosServiciosPage } from './datos-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosServiciosPageRoutingModule
  ],
  declarations: [DatosServiciosPage]
})
export class DatosServiciosPageModule {}
