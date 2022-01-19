import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialPerformance } from '../models/SocialPerformance';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SocialPerformanceTargetService {
  constructor(private http: HttpClient) {}

  getPerformanceTargets(id: string): Observable<SocialPerformance> {
    console.log('run SocialPerformance Service');
    return this.http.get<SocialPerformance>(`/api/socialPerformance/${id}`);
  }

  postSocialPerformanceTargets(
    object: object,
    setError: (msg: string) => void,
    handleSuccess: () => void
  ): void {
    this.http.post('/api/socialPerformanceTargets/', object).subscribe(
      (response) => handleSuccess(),
      (error) => setError(error.error)
    );
  }
}
