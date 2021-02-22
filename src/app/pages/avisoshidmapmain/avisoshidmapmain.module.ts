import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisoshidmapmainPageRoutingModule } from './avisoshidmapmain-routing.module';

import { AvisoshidmapmainPage } from './avisoshidmapmain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisoshidmapmainPageRoutingModule
  ],
  declarations: [AvisoshidmapmainPage]
})
export class AvisoshidmapmainPageModule {}
