import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../app/services/salesman.service';
import {Salesman} from '../../app/models/Salesman';
import {SocialPerformanceService} from '../../app/services/social-performance.service';
import {catchError} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bonus-calculation-page',
  templateUrl: './bonus-calculation-page.component.html',
  styleUrls: ['./bonus-calculation-page.component.css']
})
export class BonusCalculationPageComponent implements OnInit {

  salesman: Salesman;
  currentSalesmanId: string;
  yearOfPerformance: number;

  constructor(private salesmanService: SalesmanService, private socialPerformanceService: SocialPerformanceService
            , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentSalesmanId = this.route.snapshot.paramMap.get('id');
    this.getCurrentSalesman();
    this.getYearOfPerformance();
  }

  getCurrentSalesman(): void {
    console.log('run Salesman Service');
    this.salesmanService.getSalesman(this.currentSalesmanId.toString()).subscribe(salesman => this.salesman = salesman);
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
