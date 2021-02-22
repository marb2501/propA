import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosmap4Page } from './avisosmap4.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosmap4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosmap4PageRoutingModule {}
