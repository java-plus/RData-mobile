import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ConnexionGuardService } from '../services/connexion-guard.service';

const routes: Routes = [

  {
    path: '',
    component: TabsPage,
    canActivateChild: [ConnexionGuardService],
    children: [
      {path: 'meteo', children: [
          {path: '', loadChildren: () => import('../meteo/meteo.module').then(m => m.MeteoPageModule)}
        ]},
      {
        path: 'favoris',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favoris/favoris.module').then(m => m.FavorisPageModule)
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
