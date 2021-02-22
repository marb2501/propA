import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Alertmap2Page } from './alertmap2.page';

const routes: Routes = [
  {
    path: '',
    component: Alertmap2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Alertmap2PageRoutingModule {}
