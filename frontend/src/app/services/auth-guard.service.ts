import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * this service implements the CanActivate interface
 * it enables angular router, to check whether a user is allowed to access a page or not
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    // mapping isLoggedIn():Observable to this function:
    return this.authService.isLoggedIn()
      .pipe(
        map(state => {
          if (!state) { this.router.navigate(['login']); } // go back to login, if user is not allowed to enter
          return state;
        })
      );
  }
}
