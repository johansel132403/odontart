import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { RouterModule, Routes } from '@angular/router';

import { UserGuard } from '../services/user.guard';
import { SaveLogin } from '../services/user.saveLogin';
import { UserProtedurls } from '../services/user.protected-urls';


/// bueno lo hacavo de resolver para hacer lo de el navegador tenemos que hacerlo por el (module.ts) y no por el routing.module
//como yo pensaba ya si puedo camnbiar de pagina de una forma estatica.....



const routes: Routes = [   // esto se tiene que borrar porque en el admin.module no va esto
  {
    path: 'admin', 
    component: AdminPage,
    canActivate:[UserProtedurls],
    children:[
      {
        path: 'client',
        loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'citas',
        loadChildren: () => import('../cita/cita.module').then( m => m.CitaPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'cliente/:id',
        loadChildren: () => import('../cliente/cliente.module').then( m => m.ClientePageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'chatsadmin',
        loadChildren: () => import('../chatsadmin/chatsadmin.module').then( m => m.ChatsadminPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'crearadmin',
        loadChildren: () => import('../crearadmin/crearadmin.module').then( m => m.CrearadminPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'admins',
        loadChildren: () => import('../administradores/administradores.module').then( m => m.AdministradoresPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'usuario-admin',
        loadChildren: () => import('../usuarioadmin/usuarioadmin.module').then( m => m.UsuarioadminPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'notificacion',
        loadChildren: () => import('../notificacion/notificacion.module').then( m => m.NotificacionPageModule),
        canActivate:[UserProtedurls]
      },
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then( m => m.PostPageModule),
        canActivate:[UserProtedurls]
      },

    


      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full',
        canActivate:[UserProtedurls]
      }
    ]
  },
  {
    path:'',
    redirectTo :'/admin/client',
    pathMatch: 'full', 
  }
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    FormsModule,
    IonicModule,
    
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
