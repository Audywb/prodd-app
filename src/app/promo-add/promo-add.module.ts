import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoAddPageRoutingModule } from './promo-add-routing.module';

import { PromoAddPage } from './promo-add.page';

import { FileSizePipe } from '../file-size.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PromoAddPageRoutingModule
  ],
  declarations: [PromoAddPage, FileSizePipe]
})
export class PromoAddPageModule {}
