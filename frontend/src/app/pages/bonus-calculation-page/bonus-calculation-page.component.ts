import { Component, OnInit } from '@angular/core';
import { SALESMAN } from "../../mock-data";
import {SalesmanService} from "../../services/salesman.service";
import {Salesman} from "../../models/Salesman";

@Component({
  selector: 'app-bonus-calculation-page',
  templateUrl: './bonus-calculation-page.component.html',
  styleUrls: ['./bonus-calculation-page.component.css']
})
export class BonusCalculationPageComponent implements OnInit {

  // salesman = SALESMAN;
  salesman: Salesman;

  constructor(private salesmanService: SalesmanService) {
  }

  ngOnInit(): void {
    this.getCurrentSalesman();
  }

  getCurrentSalesman(): void {
    console.log('run Salesman Service');
    this.salesmanService.getSalesman('90123').subscribe(salesman => this.salesman = salesman);
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
