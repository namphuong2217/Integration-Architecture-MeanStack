import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SocialPerformance} from '../models/SocialPerformance';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialPerformanceService {

  constructor(private http: HttpClient) { }

  getPerformanceRecords(id: string): Observable<SocialPerformance>{
    console.log('run SocialPerformance Service');
    return this.http.get<SocialPerformance>(`/api/socialPerformance/${id}`);
  }

  //todo no post
  postSocialPerformanceRecords(object: object): void {
    this.http.post('/api/socialPerformance/', object).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
