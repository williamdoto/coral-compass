import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private dbService: DatabaseService, private router: Router, private authService: AuthService) { }

  incorrectMsg:boolean = false; // Whether to hide or show the incorrect message.

  /**
   * Sends a post request to login.
   * 
   * Getting data based off https://stackoverflow.com/questions/56766395/how-to-get-value-of-a-particular-input-in-ngform
   */
  login(loginForm: any): void {
    console.log(loginForm.value);
    this.dbService.login(loginForm.value.username, loginForm.value.password).subscribe((data: any) => {
      if (data == "Success"){
        this.incorrectMsg = false;
        this.authService.login();
        console.log(this.authService.isLoggedIn())
        this.router.navigate([''])
      } else {
        this.incorrectMsg = true;
      }
    });
  }
}
