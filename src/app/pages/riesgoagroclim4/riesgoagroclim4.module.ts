import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim4PageRoutingModule } from './riesgoagroclim4-routing.module';

import { Riesgoagroclim4Page } from './riesgoagroclim4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim4PageRoutingModule
  ],
  declarations: [Riesgoagroclim4Page]
})
export class Riesgoagroclim4PageModule {}
