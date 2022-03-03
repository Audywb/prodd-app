import { Component, OnInit } from '@angular/core';
import {PromoService} from './../pshared/promo.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-promo-display',
  templateUrl: './promo-display.page.html',
  styleUrls: ['./promo-display.page.scss'],
})
export class PromoDisplayPage implements OnInit {
Promotions: any[];
content?: string;

  constructor(
    private promoService:PromoService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.promoService.getPromoList().subscribe((res) => {
      console.log(res)
      this.Promotions = res;
    });


    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  deletePromo(song, i) {
    if (window.confirm('Do you want to delete user?')) {
      this.promoService.deletePromo(song._id)
        .subscribe(() => {
          this.Promotions.splice(i, 1);
          console.log('Promotion deleted!')
        }
        )
    }
  }
}
