import { Component, OnInit } from '@angular/core';
import {SalesmanService} from '../../services/salesman.service';
import {Salesman} from '../../models/Salesman';
import {UserService} from "../../services/user.service";
import {Role} from "../../Global";
import {User} from "../../models/User";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  salesmen: Salesman[];
  user: User;
  buttonBonusCalculation = {title: 'Bonus Calculation', routerLink: '/bonus'};
  buttonEnterSocialPerformance = {titleSales: 'Rate Social Performance',
                                  titleCEO: 'Set target of Social Performance',
                                  routerLink: '/enter-social-performance'};
  constructor(private salesmanService: SalesmanService, private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe(user => this.user = user);
    this.salesmanService.getSalesmen().subscribe( salesmen => this.salesmen = salesmen);
  }

  showBonusCalculation(sid : string): boolean {
    return Role.hasRoleHR(this.user) || Role.hasRoleCEO(this.user) || (Role.hasRoleSales(this.user) && sid == this.user.username);
  }

  showSocialPerformance() : boolean{
    return Role.hasRoleCEO(this.user) || Role.hasRoleSales(this.user);
  }

  getButtonName() : string{
    if(Role.hasRoleCEO(this.user)){return this.buttonEnterSocialPerformance.titleCEO}
    return this.buttonEnterSocialPerformance.titleSales;
  }

}
