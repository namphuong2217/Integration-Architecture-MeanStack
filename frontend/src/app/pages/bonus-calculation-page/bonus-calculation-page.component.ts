import { Component, OnInit } from '@angular/core';
import { SALESMAN } from "../../mock-data";
import {SalesmanService} from "../../services/salesman.service";
import {Salesman} from "../../models/Salesman";
import {SocialPerformanceService} from "../../services/social-performance.service";
import {catchError} from "rxjs/operators";
import {of as observableOf} from "rxjs";

@Component({
  selector: 'app-bonus-calculation-page',
  templateUrl: './bonus-calculation-page.component.html',
  styleUrls: ['./bonus-calculation-page.component.css']
})
export class BonusCalculationPageComponent implements OnInit {

  salesman: Salesman;
  yearOfPerformance: number;

  constructor(private salesmanService: SalesmanService, private socialPerformanceService: SocialPerformanceService) {
  }

  ngOnInit(): void {
    this.getCurrentSalesman();
    this.getYearOfPerformance();
  }

  getCurrentSalesman(): void {
    console.log('run Salesman Service');
    this.salesmanService.getSalesman('90123').subscribe(salesman => this.salesman = salesman);
  }

  getYearOfPerformance(): void{
    this.socialPerformanceService.getPerformanceRecords(
      '90123'
    ).pipe(catchError(() => observableOf(null)))
      .subscribe( data => {
        this.yearOfPerformance = data[0].year;
      });
  }

  // tslint:disable-next-line:typedef
  confirmBonus() {
    // TODO: Send confirm to server
  }
}
  // Vorlesung Code
//   getEmployees(): void {
//     this.employeeService.getEmployees()
//       .subscribe( employees
//         => this.employees = employees);
//
// }
//
//   getEmployees(): Observable<Employee[]> {
//     return this.http.get<Employee[]>('/api/employee')
//       .pipe( map (employees => employees ),
//         filter ( employee => employee.age > 18 ),
//         catchError( console.log(...) )
//       ); }
