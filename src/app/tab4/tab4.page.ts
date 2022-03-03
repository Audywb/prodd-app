import { Component } from '@angular/core';
import {PromoService} from './../pshared/promo.service';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  Promotions: any[];

  constructor(private promoService:PromoService) {}

  ionViewDidEnter() {
    this.promoService.getPromoList().subscribe((res) => {
      console.log(res)
      this.Promotions = res;
    })
  }

}
