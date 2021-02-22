import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisohidinfomainPageRoutingModule } from './avisohidinfomain-routing.module';
import { AvisoshidmapmainPage } from '../../pages/avisoshidmapmain/avisoshidmapmain.page';
import { AvisohidinfomainPage } from './avisohidinfomain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisohidinfomainPageRoutingModule
  ],
declarations: [AvisohidinfomainPage, AvisoshidmapmainPage],
  entryComponents: [AvisoshidmapmainPage]
})
export class AvisohidinfomainPageModule {}
