import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioPage } from './inicio/inicio.page';
import { HomePage } from './home/home.page';
import { InicComponent } from './inic/inic.component';
import { InicioPageModule } from './inicio/inicio.module';
import { HomePageModule } from './home/home.module';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
//import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';


import { Services } from '../app/services/sms.services';
import { DatosServios } from './services/servicio.services';


import { routing,  appRoutingProvider  } from './app-routing';


import { UsercomponentComponent } from "./usercomponent/usercomponent.component";


//yo quite esto 2 del import porque estaba provando algo y funciono y eso lo puse yo ahi 
import { AdminPageRoutingModule } from './admin/admin-routing.module';
import { ClientesPageRoutingModule } from './clientes/clientes-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



//servicios 
import { UserGuard } from './services/user.guard';
import { UserServices } from './services/user.services';
import { SaveLogin } from './services/user.saveLogin';
import { UserProtedurls } from './services/user.protected-urls';



// EmailComposer  comente este codigo......



@NgModule({
  declarations: [ AppComponent, UsercomponentComponent ],
  entryComponents: [],                                                
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,InicioPageModule,HomePageModule, FormsModule, HttpClientModule, SweetAlert2Module ],//routing
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CallNumber, SMS, Services, DatosServios, PhotoViewer,UserGuard,UserServices,SaveLogin,UserProtedurls ], //aapRouting.......
  bootstrap: [AppComponent],
  exports:[InicioPageModule,HomePageModule]
 
 

 
})
export class AppModule {}

