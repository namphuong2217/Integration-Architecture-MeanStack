import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {Salesman} from '../../models/Salesman';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  salesmen: Salesman[];
  userRole: String;
  buttonBonusCalculation = {title: 'Bonus Calculation', routerLink: '/bonus'};
  buttonEnterSocialPerformance = {title: 'Rate Social Performance', routerLink: '/enter-social-performance'};
  constructor(private salesmanService: SalesmanService, private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe(user => this.userRole = user.role);
    this.salesmanService.getSalesmen().subscribe( salesmen => this.salesmen = salesmen);
  }

}
