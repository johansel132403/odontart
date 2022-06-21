import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosServiciosPage } from './datos-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: DatosServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosServiciosPageRoutingModule {}
