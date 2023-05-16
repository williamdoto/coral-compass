import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
    console.log(this.authService.isLoggedIn())
    this.router.navigate([''])
  }
}
