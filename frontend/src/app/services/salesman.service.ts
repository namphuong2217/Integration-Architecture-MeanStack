import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Salesman} from '../models/Salesman';
import {HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SalesmanService {

  constructor(private http: HttpClient) { }

  getSalesman(id: string): Observable<Salesman>{
    // const params = new HttpParams().set("keyword", id);
    return this.http.get<Salesman>(`/api/salesman/${id}`);
  }

  getSalesmen(): Observable<Salesman[]>{
    // const params = new HttpParams().set("keyword", id);
    return this.http.get<Salesman[]>(`/api/salesmen`);
  }
}
