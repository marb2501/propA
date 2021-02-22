import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Smetmap1PageRoutingModule } from './smetmap1-routing.module';

import { Smetmap1Page } from './smetmap1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Smetmap1PageRoutingModule
  ],
  declarations: [Smetmap1Page]
})
export class Smetmap1PageModule {}
