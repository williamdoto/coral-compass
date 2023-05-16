import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public buttonUpdate = new Subject<boolean>();
  
  login() {
    Cookies.set('isAuthenticated', 'true', { expires: 1 });
    this.buttonUpdate.next(true);
  }

  logout() {
    Cookies.remove('isAuthenticated');
    this.buttonUpdate.next(false);
  }

  isLoggedIn(): boolean {
    // console.log(this.isAuthenticated)
    return Cookies.get('isAuthenticated') === 'true';
  }
}