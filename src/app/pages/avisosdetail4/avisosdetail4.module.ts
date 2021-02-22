import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Avisosdetail4PageRoutingModule } from './avisosdetail4-routing.module';
import { Avisosdetail4Page } from './avisosdetail4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Avisosdetail4PageRoutingModule
  ],
  declarations: [Avisosdetail4Page]
})
export class Avisosdetail4PageModule {}
