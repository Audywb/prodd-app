import { Component , OnInit} from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  isLoggedIn = false;
  showAdminBoard = false;
  isAdmin = false;

  currentUser: any;
  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.isLoggedIn = !!this.token.getToken();

    if (this.currentUser.roles == "ROLE_ADMIN"){
      this.isAdmin = true;
    }
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

}
