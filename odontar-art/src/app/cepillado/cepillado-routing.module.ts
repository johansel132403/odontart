import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CepilladoPage } from './cepillado.page';

const routes: Routes = [
  {
    path: '',
    component: CepilladoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CepilladoPageRoutingModule {}
