import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearadminPageRoutingModule } from './crearadmin-routing.module';

import { CrearadminPage } from './crearadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearadminPageRoutingModule
  ],
  declarations: [CrearadminPage]
})
export class CrearadminPageModule {}
