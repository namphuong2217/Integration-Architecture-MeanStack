import { Component, OnInit } from '@angular/core';
import { SALESMEN } from '../../mock-data';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  // TODO: Get list of all senior salesmen from backend
  salesman = SALESMEN;
  buttonBonusCalculation = {title: 'Bonus Calculation', routerLink: 'bonus-calculation'};
  buttonEnterSocialPerformance = {title: 'Rate Social Performance', routerLink: 'enter-social-performance'};
  constructor() { }

  ngOnInit(): void {
  }

}
