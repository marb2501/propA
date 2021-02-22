import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Avisosmap4PageRoutingModule } from './avisosmap4-routing.module';

import { Avisosmap4Page } from './avisosmap4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosmap4PageRoutingModule
  ],
  declarations: [Avisosmap4Page]
})
export class Avisosmap4PageModule {}
