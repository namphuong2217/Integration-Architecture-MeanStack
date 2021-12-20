import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderEvaluation} from '../models/OrderEvaluation';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderEvaluation(id: string, year: string): Observable<OrderEvaluation[]>{
    return this.http.get<OrderEvaluation[]>(`api/orderEvaluation/${id}/${year}`);
  }
}
