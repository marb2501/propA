import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosdetail1Page } from './avisosdetail1.page';


const routes: Routes = [
  {
    path: '',
    component: Avisosdetail1Page
  },
  {
    path: 'menu/avisosinfo1',
    loadChildren: () => import( '../avisosinfo1/avisosinfo1.module').then( m => m.Avisosinfo1PageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosdetail1PageRoutingModule {}
