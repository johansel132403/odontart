import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaladechatPageRoutingModule } from './saladechat-routing.module';

import { SaladechatPage } from './saladechat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaladechatPageRoutingModule
  ],
  declarations: [SaladechatPage]
})
export class SaladechatPageModule {}
