import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CepilladoPageRoutingModule } from './cepillado-routing.module';

import { CepilladoPage } from './cepillado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CepilladoPageRoutingModule
  ],
  declarations: [CepilladoPage]
})
export class CepilladoPageModule {}
