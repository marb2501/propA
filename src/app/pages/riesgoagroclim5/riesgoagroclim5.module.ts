import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Riesgoagroclim5PageRoutingModule } from './riesgoagroclim5-routing.module';

import { Riesgoagroclim5Page } from './riesgoagroclim5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Riesgoagroclim5PageRoutingModule
  ],
  declarations: [Riesgoagroclim5Page]
})
export class Riesgoagroclim5PageModule {}
