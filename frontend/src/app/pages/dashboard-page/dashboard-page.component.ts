import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {Salesman} from '../../models/Salesman';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  salesmen: Salesman[];
  buttonBonusCalculation = {title: 'Bonus Calculation', routerLink: '/bonus'};
  buttonEnterSocialPerformance = {title: 'Rate Social Performance', routerLink: '/enter-social-performance'};
  constructor(private salesmanService: SalesmanService) { }

  ngOnInit(): void {
    this.salesmanService.getSalesmen().subscribe( salesmen => this.salesmen = salesmen);
    console.log(this.salesmen);
  }

}
