import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClientesPage } from "./clientes/clientes.page";

import { UsercomponentComponent } from "./usercomponent/usercomponent.component";


const appRoutes: Routes = [
    {path: '', component: UsercomponentComponent },
    {path:'ss', component: UsercomponentComponent },

 //   {path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)}
   
]

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);