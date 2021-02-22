import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosmap24hPage } from './avisosmap24h.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosmap24hPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosmap24hPageRoutingModule {}
