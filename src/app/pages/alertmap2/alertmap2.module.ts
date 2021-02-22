import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Alertmap2PageRoutingModule } from './alertmap2-routing.module';

import { Alertmap2Page } from './alertmap2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Alertmap2PageRoutingModule
  ],
  declarations: [Alertmap2Page]
})
export class Alertmap2PageModule {}
