import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BonusCompCollection} from '../models/BonusCompCollection';

@Injectable({
  providedIn: 'root'
})
export class BonusComputationCollectionService {

  constructor(private http: HttpClient) {}

  getBonusComputationCollection(sid: string, year: string): Observable<BonusCompCollection>{
      return this.http.get<BonusCompCollection>(`/api/bonusCompCollection/${sid}/${year}`);
  }

  postBonusComputationCollection(bonusCompCollection: BonusCompCollection): Observable<string>{
    console.log(bonusCompCollection);
    return this.http.post<string>(`/api/bonusCompCollection`, bonusCompCollection);
  }

}
