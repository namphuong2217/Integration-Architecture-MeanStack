import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardStatisticsService {

  constructor(private http: HttpClient) { }

  getNumberOfProducts(): Observable<string>{
    return this.http.get<string>(`/api/numberOfProducts`);
  }

  getTotalNumberOfSales(year: string): Observable<string>{
    return this.http.get<string>(`/api/totalNumberOfSales/${year}`);
  }
}
