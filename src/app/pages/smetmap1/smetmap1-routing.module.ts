import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Smetmap1Page } from './smetmap1.page';

const routes: Routes = [
  {
    path: '',
    component: Smetmap1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Smetmap1PageRoutingModule {}
