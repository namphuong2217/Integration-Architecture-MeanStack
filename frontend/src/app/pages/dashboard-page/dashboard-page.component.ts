import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../../services/salesman.service';
import { Salesman } from '../../models/Salesman';
import { UserService } from '../../services/user.service';
import { Permissions } from '../../Global';
import { User } from '../../models/User';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  salesmen: Salesman[];
  salesmenCount: number;
  year: string;
  user: User;
  buttonBonusCalculation = { title: 'Bonus Calculation', routerLink: '/bonus' };
  buttonEnterSocialPerformance = {
    titleSales: 'Rate Social Performance',
    titleCEO: 'Set target of Social Performance',
    routerLink: '/enter-social-performance',
  };
  constructor(
    private salesmanService: SalesmanService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.salesmanService.getSalesmen().subscribe((salesmen) => {
      this.salesmen = salesmen;
      this.salesmenCount = salesmen.length;
    });
    this.year = new Date().getFullYear().toString();
  }

  showBonusCalculation(sid: string): boolean {
    return (
      Permissions.hasUserPermission(this.user, 'allBonusCalc') ||
      (Permissions.hasUserPermission(this.user, 'viewOwnBonusCalc') &&
        sid == this.user.username)
    );
  }

  showSocialPerformance(sid: string): boolean {
    const hasPermissionToEval = Permissions.hasUserPermission(
      this.user,
      'socialPerformanceEval'
    );
    const hasPermissionToSetTarget = Permissions.hasUserPermission(
      this.user,
      'socialPerformanceTarget'
    );
    return (
      (hasPermissionToEval || hasPermissionToSetTarget) &&
      this.user.username !== sid
    );
  }

  getButtonName(): string {
    if (Permissions.hasUserPermission(this.user, 'socialPerformanceTarget')) {
      return this.buttonEnterSocialPerformance.titleCEO;
    }
    return this.buttonEnterSocialPerformance.titleSales;
  }
}
