import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim2Page } from './riesgoagroclim2.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim2PageRoutingModule {}
