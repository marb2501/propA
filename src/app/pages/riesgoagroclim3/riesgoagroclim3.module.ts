import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim3PageRoutingModule } from './riesgoagroclim3-routing.module';

import { Riesgoagroclim3Page } from './riesgoagroclim3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim3PageRoutingModule
  ],
  declarations: [Riesgoagroclim3Page]
})
export class Riesgoagroclim3PageModule {}
