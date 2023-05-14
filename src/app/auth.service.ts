import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login() {
    Cookies.set('isAuthenticated', 'true', { expires: 1 });
  }

  logout() {
    Cookies.remove('isAuthenticated');
  }

  isLoggedIn(): boolean {
    // console.log(this.isAuthenticated)
    return Cookies.get('isAuthenticated') === 'true';
  }
}