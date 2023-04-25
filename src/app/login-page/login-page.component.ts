import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private dbService: DatabaseService) { }

  /**
   * Sends a post request to login.
   * 
   * Getting data based off https://stackoverflow.com/questions/56766395/how-to-get-value-of-a-particular-input-in-ngform
   */
  login(loginForm: any): void {
    console.log(loginForm.value);
    this.dbService.login(loginForm.value.username, loginForm.value.password).subscribe((data: any) => {
      alert(data);
    });
  }
}
