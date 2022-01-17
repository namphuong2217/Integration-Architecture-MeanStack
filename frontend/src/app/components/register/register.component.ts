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
  @Input() switchView: () => void;

  credentials: Credentials;

  registrationError: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  enterApplication() {
    this.router.navigate(['']);
  }

  resetCredentials() {
    this.credentials = new Credentials('', '');
  }

  performRegistration() {
    this.authService.register(this.credentials).subscribe(
      (response) => {
        if (response.status === 200) {
          //if response status is 200, assume login was successful
          this.resetCredentials();
          this.enterApplication();
        } else {
          this.registrationError = response.body;
        }
      },
      (error) => {
        this.registrationError = error.error;
      }
    );
  }
}
