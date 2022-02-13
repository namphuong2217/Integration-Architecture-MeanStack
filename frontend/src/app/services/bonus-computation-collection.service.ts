import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonusCompCollection } from '../models/BonusCompCollection';
import { ApprovedBonus } from '../models/ApprovedBonus';

@Injectable({
  providedIn: 'root',
})
export class BonusComputationCollectionService {
  constructor(private http: HttpClient) {}

  getBonusComputationCollection(
    sid: string,
    year: string
  ): Observable<BonusCompCollection> {
    return this.http.get<BonusCompCollection>(
      `/api/bonusCompCollection/${sid}/${year}`
    );
  }

  getApprovedBonuses(year: string): Observable<ApprovedBonus[]> {
    return this.http.get<ApprovedBonus[]>(`/api/approvedBonuses/${year}`);
  }

  updateBonusSocialPerformance(
    bonusCompCollection: BonusCompCollection
  ): Observable<string> {
    return this.http.put<string>(
      `/api/bonusSocialPerformance`,
      bonusCompCollection
    );
  }

  postBonusComputationCollection(
    bonusCompCollection: BonusCompCollection
  ): Observable<string> {
    return this.http.post<string>(
      `/api/bonusCompCollection`,
      bonusCompCollection
    );
  }
}
