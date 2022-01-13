import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {Salesman} from '../../models/Salesman';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-enter-social-performance-page',
  templateUrl: './enter-social-performance-page.component.html',
  styleUrls: ['./enter-social-performance-page.component.css']
})
export class EnterSocialPerformancePageComponent implements OnInit {

  salesman: Salesman;
  currentSalesmanId: string;
  // currentYearOfPerformance = new FormControl([], Validators.required);
  constructor(private salesmanService: SalesmanService, private socialPerformanceService: SocialPerformanceService
    , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentSalesmanId = this.route.snapshot.paramMap.get('sid');
    this.getCurrentSalesman();
  }

  getCurrentSalesman(): void {
    console.log('run Salesman Service');
    this.salesmanService.getSalesman(this.currentSalesmanId.toString()).subscribe(salesman => this.salesman = salesman);
  }

}
