import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearadminPage } from './crearadmin.page';

const routes: Routes = [
  {
    path: '',
    component: CrearadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearadminPageRoutingModule {}
