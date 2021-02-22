import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPageRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';
import { IonicSelectableModule  } from 'ionic-selectable';
import { AvisoshidmapmainPage } from '../../pages/avisoshidmapmain/avisoshidmapmain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    IonicSelectableModule  ],
  declarations: [MainPage]

})
export class MainPageModule {}
