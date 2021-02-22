import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosmetmapmainPage } from './avisosmetmapmain.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosmetmapmainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosmetmapmainPageRoutingModule {}
