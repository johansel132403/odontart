import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsadminPage } from './chatsadmin.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsadminPageRoutingModule {}
