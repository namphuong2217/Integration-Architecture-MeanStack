import { Component, OnInit } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {SalesmanService} from '../../services/salesman.service';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {Salesman} from '../../models/Salesman';

@Component({
  selector: 'app-enter-social-performance-page',
  templateUrl: './enter-social-performance-page.component.html',
  styleUrls: ['./enter-social-performance-page.component.css']
})
export class EnterSocialPerformancePageComponent implements OnInit {

  salesman: Salesman;
  constructor(private salesmanService: SalesmanService, private socialPerformanceService: SocialPerformanceService) { }

  ngOnInit(): void {
    this.getCurrentSalesman();
  }

  getCurrentSalesman(): void {
    console.log('run Salesman Service');
    this.salesmanService.getSalesman('90123').subscribe(salesman => this.salesman = salesman);
  }

}
