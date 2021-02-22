import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisoshidmapmainPage } from './avisoshidmapmain.page';

const routes: Routes = [
  {
    path: '',
    component: AvisoshidmapmainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisoshidmapmainPageRoutingModule {}
