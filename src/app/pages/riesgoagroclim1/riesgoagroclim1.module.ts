import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim1PageRoutingModule } from './riesgoagroclim1-routing.module';

import { Riesgoagroclim1Page } from './riesgoagroclim1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim1PageRoutingModule
  ],
  declarations: [Riesgoagroclim1Page]
})
export class Riesgoagroclim1PageModule {}
