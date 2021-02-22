import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Smetmap2Page } from './smetmap2.page';

const routes: Routes = [
  {
    path: '',
    component: Smetmap2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Smetmap2PageRoutingModule {}
