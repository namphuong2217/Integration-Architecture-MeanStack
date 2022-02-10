import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.authService.subscribeLoginChange((newState: boolean) => {
      this.isLoggedIn = newState;
    });
    this.authService.isLoggedIn().subscribe();
    this.titleService.setTitle('Bonus Management Tool');
  }
}
