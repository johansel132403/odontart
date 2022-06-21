import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditadminPage } from './editadmin.page';

const routes: Routes = [
  {
    path: '',
    component: EditadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditadminPageRoutingModule {}
