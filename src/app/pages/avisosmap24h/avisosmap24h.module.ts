import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Avisosmap24hPageRoutingModule } from './avisosmap24h-routing.module';

import { Avisosmap24hPage } from './avisosmap24h.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosmap24hPageRoutingModule
  ],
  declarations: [Avisosmap24hPage]
})
export class Avisosmap24hPageModule {}
