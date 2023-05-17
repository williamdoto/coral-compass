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
  db = []
  errorMsgs: string[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  /**
   * Attempts to create an account using the values entered into the form.
   */
  signUp() {
    // Validation and sign up logic goes here
    this.errorMsgs = [];

    // Check all required fields are included.
    if (!(this.username && this.email && this.password && this.confirmPassword)) {
      this.errorMsgs = ["The username, email, password and password confirmation are all required."];
      return;
    }

    // Check the passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMsgs = ["Passwords do not match!"];
      return;
    }

    // Attempt to create the account
    this.dbService.createAccount(this.username, this.email, this.password).subscribe({
      next: result => {
        // The server was happy and added the account.
        console.log("Successfully added", result);
        alert("Account created successfully");
      },
      error: error => {
        // The server returned an error code. Print it to the user.
        console.log("Error from server:", error);

        // Expected data structure
        const formatted: {
          error?: (
            {
              errors?: {
                msg: string
              }[],
              error?: {
                msg: string
              },
              text?: string
            } |
            string
          )
        } = error;

        // Check we have the required actributes
        const genericMsg = "There was an issue. Please try again";
        if (formatted.error) {
          if (typeof formatted.error === "string") {
            // Simple error like the server notresponding (single string)
            this.errorMsgs = [formatted.error];
          } else if (formatted.error.errors) {
            // Array of errors from the validator.
            this.errorMsgs = formatted.error.errors.map(err => err.msg ?? genericMsg);
          } else if (formatted.error.error) {
            // Single error from the validator.
            this.errorMsgs = [formatted.error.text ?? genericMsg];
          }
        }
      }
    });
  }
}