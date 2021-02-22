import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosinfo4Page } from './avisosinfo4.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosinfo4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosinfo4PageRoutingModule {}
