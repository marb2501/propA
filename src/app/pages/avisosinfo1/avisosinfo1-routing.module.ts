import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosinfo1Page } from './avisosinfo1.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosinfo1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosinfo1PageRoutingModule {}
