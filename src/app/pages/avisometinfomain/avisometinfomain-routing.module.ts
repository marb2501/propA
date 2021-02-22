import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisometinfomainPage } from './avisometinfomain.page';

const routes: Routes = [
  {
    path: '',
    component: AvisometinfomainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisometinfomainPageRoutingModule {}
