import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisohidinfomainPage } from './avisohidinfomain.page';

const routes: Routes = [
  {
    path: '',
    component: AvisohidinfomainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisohidinfomainPageRoutingModule {}
