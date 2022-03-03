import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoDisplayPage } from './promo-display.page';

const routes: Routes = [
  {
    path: '',
    component: PromoDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoDisplayPageRoutingModule {}
