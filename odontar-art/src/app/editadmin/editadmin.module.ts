import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditadminPageRoutingModule } from './editadmin-routing.module';

import { EditadminPage } from './editadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditadminPageRoutingModule
  ],
  declarations: [EditadminPage]
})
export class EditadminPageModule {}
