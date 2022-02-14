import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/Credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  credentials: Credentials;

  registrationError: string;

  pwRepeat: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.resetCredentials();
  }

  enterApplication() {
    this.router.navigate(['']);
  }

  resetCredentials() {
    this.credentials = new Credentials('', '');
  }

  performRegistration() {
    if (this.pwRepeat !== this.credentials.password) {
      this.registrationError = 'Passwords do not match';
      this.pwRepeat = '';
      return;
    }
    this.authService.register(this.credentials).subscribe(
      (response) => {
        if (response.status === 200) {
          //if response status is 200, assume login was successful
          this.resetCredentials();
        } else {
          this.registrationError = response.body;
          this.resetCredentials();
        }
      },
      (error) => {
        this.registrationError = error.error;
        this.resetCredentials();
        this.pwRepeat = '';
      }
    );
  }
}
