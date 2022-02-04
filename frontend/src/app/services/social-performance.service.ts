import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialPerformance } from '../models/SocialPerformance';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocialPerformanceService {
  constructor(private http: HttpClient) {}

  getPerformanceRecords(id: string): Observable<SocialPerformance> {
    console.log('run SocialPerformance Service');
    return this.http.get<SocialPerformance>(`/api/socialPerformance/${id}`);
  }

  postSocialPerformanceRecords(
    object: object,
    setError: (msg: string) => void,
    handleSuccess: () => void
  ): void {
    this.http.post('/api/socialPerformance/', object).subscribe(
      () => handleSuccess(),
      (error) => setError(error.error)
    );
  }
}
