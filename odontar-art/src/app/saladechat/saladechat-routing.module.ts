import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaladechatPage } from './saladechat.page';

const routes: Routes = [
  {
    path: '',
    component: SaladechatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaladechatPageRoutingModule {}
