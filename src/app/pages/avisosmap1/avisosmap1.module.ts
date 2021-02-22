import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Avisosmap1PageRoutingModule } from './avisosmap1-routing.module';

import { Avisosmap1Page } from './avisosmap1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosmap1PageRoutingModule
  ],
  declarations: [Avisosmap1Page]
})
export class Avisosmap1PageModule {}
