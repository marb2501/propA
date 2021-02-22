import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Avisosmap1Page } from '../avisosmap1/avisosmap1.page';
import { Avisosinfo1PageRoutingModule } from './avisosinfo1-routing.module';

import { Avisosinfo1Page } from './avisosinfo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosinfo1PageRoutingModule
  ],
  declarations: [Avisosinfo1Page,Avisosmap1Page],
  entryComponents: [Avisosmap1Page]
})
export class Avisosinfo1PageModule {}
