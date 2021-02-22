import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Riesgoagroclim3Page } from './riesgoagroclim3.page';

const routes: Routes = [
  {
    path: '',
    component: Riesgoagroclim3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Riesgoagroclim3PageRoutingModule {}
