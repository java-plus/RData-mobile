import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'secure',
    component: TabsPage,
    children: [
      {
        path: 'meteo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../meteo/meteo.module').then(m => m.MeteoPageModule)
          }
        ]
      },
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
      },
      {
        path: '',
        redirectTo: '/secure/meteo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/secure/meteo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
