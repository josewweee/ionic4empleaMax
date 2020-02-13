import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        // ESTAS RUTAS VAN AQUI POR QUE SE ADMINISTRAN DESDE EL MENU
        path: 'home',
        loadChildren: () =>
        import('../home/home.module')
        .then(m => m.HomePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module')
        .then(m => m.SettingsPageModule)
      },
      {
        path: 'sports',
        loadChildren: () => import('../sports/sports.module').then( m => m.SportsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
