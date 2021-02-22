import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosmapquebraPageRoutingModule } from './avisosmapquebra-routing.module';

import { AvisosmapquebraPage } from './avisosmapquebra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosmapquebraPageRoutingModule
  ],
  declarations: [AvisosmapquebraPage]
})
export class AvisosmapquebraPageModule {}
