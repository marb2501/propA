import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim1Page } from './riesgoagroclim1.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim1PageRoutingModule {}
