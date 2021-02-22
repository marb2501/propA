import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AvisosmetmapmainPage } from '../avisosmetmapmain/avisosmetmapmain.page';
import { AvisometinfomainPageRoutingModule } from './avisometinfomain-routing.module';

import { AvisometinfomainPage } from './avisometinfomain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisometinfomainPageRoutingModule
  ],
  declarations: [AvisometinfomainPage,AvisosmetmapmainPage],
  entryComponents: [AvisosmetmapmainPage]
})
export class AvisometinfomainPageModule {}
