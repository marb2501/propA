import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim4Page } from './riesgoagroclim4.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim4PageRoutingModule {}
