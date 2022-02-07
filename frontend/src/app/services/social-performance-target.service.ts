import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialPerformance } from '../models/SocialPerformance';
import { HttpClient } from '@angular/common/http';

interface targetExists {
  exists: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SocialPerformanceTargetService {
  constructor(private http: HttpClient) {}

  getPerformanceTargets(
    id: string,
    year: string
  ): Observable<SocialPerformance> {
    return this.http.get<SocialPerformance>(
      `/api/socialPerformanceTargets/${id}/${year}`
    );
  }

  getPerformanceTargetsExist(
    sid: string,
    year: string
  ): Observable<targetExists> {
    return this.http.get<targetExists>(
      `/api/socialPerformanceTargetsExist/${sid}/${year}`
    );
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
