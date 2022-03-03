import { Component, OnInit } from '@angular/core';
import { PromoService } from './../pshared/promo.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.page.html',
  styleUrls: ['./edit-song.page.scss'],
})
export class EditSongPage implements OnInit {
  updatePromoForm: FormGroup;
  id: any;

  constructor(
    private proAPI: PromoService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) { this.id = this.actRoute.snapshot.paramMap.get('id')}

  ngOnInit() {
    this.getPromoData(this.id);
    this.updatePromoForm = this.fb.group({
      title: [''],
      description: ['']
    })
  }
  getPromoData(id) {
    this.proAPI.getPromo(id).subscribe(res => {
      this.updatePromoForm.setValue({
        title: res['title'],
        description: res['description']
      });
    });
  }
  updateForm() {
    if (!this.updatePromoForm.valid) {
      return false;
    } else {
      this.proAPI.updatePromo(this.id, this.updatePromoForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updatePromoForm.reset();
          this.router.navigate(['/promo-display']);
        })
    }
  }

}
