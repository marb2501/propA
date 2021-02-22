import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'menu/avisometinfomain',
    loadChildren: () => import('../avisometinfomain/avisometinfomain.module').then( m => m.AvisometinfomainPageModule)
  },
  {
    path: 'menu/avisohidinfomain',
    loadChildren: () => import('../avisohidinfomain/avisohidinfomain.module').then( m => m.AvisohidinfomainPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
