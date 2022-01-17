import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/Credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //object for input-binding
  credentials: Credentials;

  @Input() switchView: () => void;

  loginError: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.resetCredentials();
  }

  /**
   * handles login operation, by calling the authService
   */
  performLogin() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        if (response.status === 200) {
          //if response status is 200, assume login was successful
          this.resetCredentials();
          this.enterApplication();
        } else {
          this.loginError = response.body;
        }
      },
      (error) => {
        this.loginError = error.error;
      }
    );
  }

  /**
   * resets login form
   */
  resetCredentials() {
    this.credentials = new Credentials('', '');
  }

  /**
   * redirects to the landing page
   */
  enterApplication() {
    this.router.navigate(['']);
  }
}
