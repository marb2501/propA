import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Smetmap2PageRoutingModule } from './smetmap2-routing.module';

import { Smetmap2Page } from './smetmap2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Smetmap2PageRoutingModule
  ],
  declarations: [Smetmap2Page]
})
export class Smetmap2PageModule {}
