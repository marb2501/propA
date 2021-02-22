import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosmap1Page } from './avisosmap1.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosmap1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosmap1PageRoutingModule {}
