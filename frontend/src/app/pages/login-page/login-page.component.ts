import { Component } from '@angular/core';

/**
 * This page wraps the login-component
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  showLogin: boolean;
  message: string;

  switchView = () => {
    this.showLogin = !this.showLogin;
  };

  constructor() {
    this.showLogin = true;
  }
}
