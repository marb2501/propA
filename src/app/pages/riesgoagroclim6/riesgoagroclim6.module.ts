import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim6PageRoutingModule } from './riesgoagroclim6-routing.module';

import { Riesgoagroclim6Page } from './riesgoagroclim6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim6PageRoutingModule
  ],
  declarations: [Riesgoagroclim6Page]
})
export class Riesgoagroclim6PageModule {}
