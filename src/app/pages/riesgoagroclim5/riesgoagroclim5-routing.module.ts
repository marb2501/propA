import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim5Page } from './riesgoagroclim5.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim5PageRoutingModule {}
