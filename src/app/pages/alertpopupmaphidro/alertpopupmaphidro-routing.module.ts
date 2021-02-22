import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertpopupmaphidroPage } from './alertpopupmaphidro.page';

const routes: Routes = [
  {
    path: '',
    component: AlertpopupmaphidroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertpopupmaphidroPageRoutingModule {}
