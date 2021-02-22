import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim6Page } from './riesgoagroclim6.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim6PageRoutingModule {}
