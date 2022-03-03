import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { Router } from '@angular/router';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {




  default_profile = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  form: any = {
    username: null,
    email: null,
    password: null,
    profile_url: this.default_profile,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router:Router,private authService: AuthService,
  ) {}

  ngOnInit() {}


  onSubmit(): void {
    const { username, email, password ,profile_url} = this.form;
    this.authService.register(username, email, password, profile_url).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

}
