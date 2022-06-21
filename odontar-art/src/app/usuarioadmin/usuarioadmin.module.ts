import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioadminPageRoutingModule } from './usuarioadmin-routing.module';

import { UsuarioadminPage } from './usuarioadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioadminPageRoutingModule
  ],
  declarations: [UsuarioadminPage]
})
export class UsuarioadminPageModule {}
