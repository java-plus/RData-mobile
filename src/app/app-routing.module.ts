import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConnexionGuardService } from './services/connexion-guard.service';

const routes: Routes = [
  
  
  {
    path: 'secure',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  /*{ path: 'secure/meteo', loadChildren: './meteo/meteo.module#MeteoPageModule' },
  { path: 'secure/favoris', loadChildren: './favoris/favoris.module#FavorisPageModule' },
  { path: 'secure/notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  */{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: '**',
    redirectTo: '/secure/meteo',
    pathMatch: 'full'
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
