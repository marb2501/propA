import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertmaphidroPage } from './alertmaphidro.page';

const routes: Routes = [
  {
    path: '',
    component: AlertmaphidroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertmaphidroPageRoutingModule {}
