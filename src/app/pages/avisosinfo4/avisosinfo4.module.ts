import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Avisosinfo4PageRoutingModule } from './avisosinfo4-routing.module';
import { Avisosinfo4Page } from './avisosinfo4.page';
import { Avisosmap4Page } from '../avisosmap4/avisosmap4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosinfo4PageRoutingModule
  ],
  declarations: [Avisosinfo4Page, Avisosmap4Page],
  entryComponents: [Avisosmap4Page]

})
export class Avisosinfo4PageModule {}
