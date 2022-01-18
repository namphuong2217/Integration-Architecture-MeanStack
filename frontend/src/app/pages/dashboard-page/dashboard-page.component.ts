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
  }

  showBonusCalculation(sid: string): boolean {
    return (
      Permissions.hasUserPermission(this.user, 'allBonusCalc') ||
      (Permissions.hasUserPermission(this.user, 'viewOwnBonusCalc') &&
        sid == this.user.username)
    );
  }

  showSocialPerformance(): boolean {
    return (
      Permissions.hasUserPermission(this.user, 'socialPerformanceEval') ||
      Permissions.hasUserPermission(this.user, 'socialPerformanceTarget')
    );
  }

  getButtonName(): string {
    if (Permissions.hasUserPermission(this.user, 'socialPerformanceTarget')) {
      return this.buttonEnterSocialPerformance.titleCEO;
    }
    return this.buttonEnterSocialPerformance.titleSales;
  }
}
