import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsadminPageRoutingModule } from './chatsadmin-routing.module';

import { ChatsadminPage } from './chatsadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsadminPageRoutingModule
  ],
  declarations: [ChatsadminPage]
})
export class ChatsadminPageModule {}
