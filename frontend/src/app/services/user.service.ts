import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {HttpClient} from '@angular/common/http';

/**
 * handles backend communication regarding user accounts
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * retrieves userdata of currently authenticated user
   */
  getOwnUser(): Observable<User>{
    // tslint:disable-next-line:max-line-length
    return this.http.get<User>('/api/user'); // use angular's integrated HTTP-client to make a get request; handle the response as a User object
  }
}
