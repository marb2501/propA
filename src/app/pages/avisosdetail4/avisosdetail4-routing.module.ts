import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Avisosdetail4Page } from './avisosdetail4.page';

const routes: Routes = [
  {
    path: '',
    component: Avisosdetail4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Avisosdetail4PageRoutingModule {}
