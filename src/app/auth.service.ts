import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public buttonUpdate = new Subject<boolean>();
  
  /**
   * Logs the user in on the frontend. Server login is handled separately.
   */
  login() {
    Cookies.set('isAuthenticated', 'true', { expires: 1 });
    this.buttonUpdate.next(true);
  }

  /**
   * Logs the user out.
   */
  logout() {
    Cookies.remove('isAuthenticated');
    this.buttonUpdate.next(false);
  }

  /**
   * Checks whether the user is logged in on the frontend.
   * @returns true if the user is logged in.
   */
  isLoggedIn(): boolean {
    // console.log(this.isAuthenticated)
    return Cookies.get('isAuthenticated') === 'true';
  }
}