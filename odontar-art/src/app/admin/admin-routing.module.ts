import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {    //esto vamos a tener que ponerlo como lo teniamos ante ya que pudimos hacerlo por el mudule.ts
    path: 'admin',// creo que tenemos que quitar este admin para ver si asi funciona...... 
    component: AdminPage,
    children:[
      {
        path: 'client',
        loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule) //me quede por aqui
        //la pagina se puede ver el client pero estamos tratando de que se vean lo demas 
      },

      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'',
    redirectTo :'/admin/clientes',
    pathMatch: 'full', 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations:[AdminPage]
})
export class AdminPageRoutingModule {}


//https://www.youtube.com/watch?v=I82_roQSgco video de youtube