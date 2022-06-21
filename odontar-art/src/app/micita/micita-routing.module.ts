import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicitaPage } from './micita.page';

const routes: Routes = [
  {
    path: '',
    component: MicitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicitaPageRoutingModule {}
