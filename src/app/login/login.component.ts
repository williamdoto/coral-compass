import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // template: `
  //   Favorite Color: <input type="text" [formControl]="username">
  // `
})
export class LoginComponent {
  username = new FormControl('');
  password = new FormControl('');

  printToConsole() {
    console.log(`Username: ${this.username.getRawValue()}, Password: ${this.password.getRawValue()}`);
  }
}
