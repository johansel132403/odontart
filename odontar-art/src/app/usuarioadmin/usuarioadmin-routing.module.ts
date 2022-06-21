import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioadminPage } from './usuarioadmin.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioadminPageRoutingModule {}
