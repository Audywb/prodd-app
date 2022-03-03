import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoAddPage } from './promo-add.page';

const routes: Routes = [
  {
    path: '',
    component: PromoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoAddPageRoutingModule {}
