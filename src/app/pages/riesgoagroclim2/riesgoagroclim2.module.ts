import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim2PageRoutingModule } from './riesgoagroclim2-routing.module';

import { Riesgoagroclim2Page } from './riesgoagroclim2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim2PageRoutingModule
  ],
  declarations: [Riesgoagroclim2Page]
})
export class Riesgoagroclim2PageModule {}
