import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './services/user.guard';
import { SaveLogin } from './services/user.saveLogin';
    
    

const routes: Routes = [

  {   //bueno aqui tenemos un problema y es que la paginacion nada mas funciona cuando 
    //tenemos el andmi en blanco como esta aqui y eso no puede ir asi porque a la hora de arrancar la 
    //pagina no puede iniciar desde el admin .... 
    path: '',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate:[UserGuard]
  },

  
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[UserGuard]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  // {
  //   path: 'servicios',
  //   loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
  // },
  // {
  //   path: 'datos-servicios',
  //   loadChildren: () => import('./servicios/datos-servicios/datos-servicios.module').then( m => m.DatosServiciosPageModule)
  // },

   {
    path: 'servicios',
    children: [

      {
        path: 'servicio',//esta p la puse yo 
        loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule),
        canActivate:[UserGuard]
      },

      {

        path: ':servicioId',
        loadChildren: () => import('./servicios/datos-servicios/datos-servicios.module').then( m => m.DatosServiciosPageModule),
        canActivate:[UserGuard]

      }
    ]
    
  },   {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
     canActivate:[SaveLogin]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'videollamada',
    loadChildren: () => import('./videollamada/videollamada.module').then( m => m.VideollamadaPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'videollamada/:id',
    loadChildren: () => import('./videollamada/videollamada.module').then( m => m.VideollamadaPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'cepillado',
    loadChildren: () => import('./cepillado/cepillado.module').then( m => m.CepilladoPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'editadmin',
    loadChildren: () => import('./editadmin/editadmin.module').then( m => m.EditadminPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'saladechat',
    loadChildren: () => import('./saladechat/saladechat.module').then( m => m.SaladechatPageModule),
    canActivate:[UserGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'micita',
    loadChildren: () => import('./micita/micita.module').then( m => m.MicitaPageModule)
  },
  // {
  //   path: 'notificacion',
  //   loadChildren: () => import('./notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  // },
  // {
  //   path: 'usuarioadmin',
  //   loadChildren: () => import('./usuarioadmin/usuarioadmin.module').then( m => m.UsuarioadminPageModule)
  // },
  // {
  //   path: 'administradores',
  //   loadChildren: () => import('./administradores/administradores.module').then( m => m.AdministradoresPageModule)
  // },
  // {
  //   path: 'crearadmin',
  //   loadChildren: () => import('./crearadmin/crearadmin.module').then( m => m.CrearadminPageModule)
  // },
  // {
  //   path: 'chatsadmin',
  //   loadChildren: () => import('./chatsadmin/chatsadmin.module').then( m => m.ChatsadminPageModule)
  // },
 
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  // },
  // {
  //   path: 'clientes',
  //   loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  // },
   
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
