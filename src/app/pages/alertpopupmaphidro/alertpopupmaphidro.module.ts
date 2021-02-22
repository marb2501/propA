import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertpopupmaphidroPageRoutingModule } from './alertpopupmaphidro-routing.module';

import { AlertpopupmaphidroPage } from './alertpopupmaphidro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertpopupmaphidroPageRoutingModule
  ],
  declarations: [AlertpopupmaphidroPage]
})
export class AlertpopupmaphidroPageModule {}
