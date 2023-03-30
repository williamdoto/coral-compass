import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router";

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

  constructor(private dbService: DatabaseService, private router: Router) { }

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
    

    let obj = {username: this.username, email: this.email, password: this.password};
    this.dbService.createAccount(obj).subscribe(result => {
      this.router.navigate(["/accountSuccessful"]);
    });
}
}