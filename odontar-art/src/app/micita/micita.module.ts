import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicitaPageRoutingModule } from './micita-routing.module';

import { MicitaPage } from './micita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicitaPageRoutingModule
  ],
  declarations: [MicitaPage]
})
export class MicitaPageModule {}
