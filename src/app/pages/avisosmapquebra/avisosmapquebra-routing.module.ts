import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosmapquebraPage } from './avisosmapquebra.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosmapquebraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosmapquebraPageRoutingModule {}
