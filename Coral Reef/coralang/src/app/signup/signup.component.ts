import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() { }

  signUp() {
    // Validation and sign up logic goes here
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Proceed with sign up
    console.log("User data:", {
      username: this.username,
      email: this.email,
      password: this.password
    });

    // Implement sign up logic with a service or API call
}
}