import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isCollapsed = true;

  showLoginBtn: boolean = true;
  showImportBtn: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.setLoggedIn(this.authService.isLoggedIn());
    this.authService.buttonUpdate.subscribe(state => this.setLoggedIn(state));
  }

  /**
   * Shows the upload data button once logged in. and replaces it with the login
   * button as needed.
   * 
   * @param state if true, show the upload button. Else show the login button.
   */
  setLoggedIn(state: boolean) {
    if (state) {
      // Logged in.
      console.log("Logged in");
      this.showImportBtn = true;
      this.showLoginBtn = false;
    } else {
      // Not logged in.
      console.log("Not logged in");
      this.showImportBtn = false;
      this.showLoginBtn = true;
    }
  }
}
