import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Avisosdetail1PageRoutingModule } from './avisosdetail1-routing.module';
import { Avisosdetail1Page } from './avisosdetail1.page';

import { IonicSelectableModule  } from 'ionic-selectable';
import { AvisosmapquebraPage } from '../avisosmapquebra/avisosmapquebra.page';
import { Avisosmap24hPage } from '../avisosmap24h/avisosmap24h.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosdetail1PageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [Avisosdetail1Page, AvisosmapquebraPage, Avisosmap24hPage],
  entryComponents: [AvisosmapquebraPage, Avisosmap24hPage]
})
export class Avisosdetail1PageModule {}
