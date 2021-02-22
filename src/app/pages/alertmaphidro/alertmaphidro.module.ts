import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertmaphidroPageRoutingModule } from './alertmaphidro-routing.module';

import { AlertmaphidroPage } from './alertmaphidro.page';
import { AlertpopupmaphidroPage } from '../alertpopupmaphidro/alertpopupmaphidro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertmaphidroPageRoutingModule
  ],
  declarations: [AlertmaphidroPage, AlertpopupmaphidroPage],
  entryComponents: [AlertpopupmaphidroPage]
})
export class AlertmaphidroPageModule {}
