import { Injectable } from '@angular/core';
import { Credentials } from '../models/Credentials';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * Services specify logic, which is instantiated singularly -> it is shared between components
 * This service handles authorization with the backend
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: boolean = false;
  authPreCheck: boolean = false;
  listeners: ((boolean) => void)[] = [];

  constructor(private http: HttpClient) {}

  /**
   * returns the current login state
   */
  isLoggedIn(): Observable<boolean> {
    if (!this.authPreCheck) {
      return this.checkLogin().pipe(
        map((response: HttpResponse<{ loggedIn: boolean }>) => {
          this.emitLoginChange(response.body.loggedIn);
          return response.body.loggedIn;
        })
      );
    }
    return new Observable((observer: Observer<boolean>) => {
      observer.next(this.loggedIn);
      observer.complete();
    });
  }

  /**
   * subscribe to changes of the login state
   * @param callback
   */
  subscribeLoginChange(callback: (boolean) => void) {
    this.listeners.push(callback);
  }

  /**
   * notifies all listeners with a new login state
   * @param newState
   */
  emitLoginChange(newState: boolean) {
    this.listeners.forEach((callback) => {
      callback(newState);
    });
  }

  /**
   * retrieves the login state from backend
   */
  checkLogin(): Observable<HttpResponse<{ loggedIn: boolean }>> {
    return this.http.get<{ loggedIn: boolean }>('/api/login', {
      observe: 'response',
    });
  }

  /**
   * authenticates a user with credentials against backend
   * @param credentials consisting of username and password
   */
  login(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http
      .post('/api/login', credentials, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            //if request was successful
            this.loggedIn = true; //set new stat
            this.emitLoginChange(true); //notify listeners
          }
        })
      );
  }

  /**
   * authenticates a user with credentials against backend
   * @param credentials consisting of username and password
   */
  register(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http
      .post('/api/register', credentials, {
        observe: 'response',
        responseType: 'text',
      })
  }

  /**
   *
   */
  logout(): Observable<HttpResponse<any>> {
    return this.http
      .delete('/api/login', { observe: 'response', responseType: 'text' })
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            this.loggedIn = false;
            this.emitLoginChange(false);
          }
        })
      );
  }
}
