import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosmetmapmainPageRoutingModule } from './avisosmetmapmain-routing.module';

import { AvisosmetmapmainPage } from './avisosmetmapmain.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosmetmapmainPageRoutingModule
  ],
  declarations: [AvisosmetmapmainPage]
})
export class AvisosmetmapmainPageModule {}
