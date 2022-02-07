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
  bonusCalculationLink = '/bonus';
  buttonEnterSocialPerformance = {
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

  getBonusButtonTitle() {
    if (Permissions.hasUserPermission(this.user, 'allBonusCalc')) {
      return 'Confirm Bonus';
    } else {
      return 'View Bonus Calculation';
    }
  }

  showSocialPerformance(sid: string): boolean {
    const hasPermissionToEval = Permissions.hasUserPermission(
      this.user,
      'socialPerformanceEval'
    );
    return hasPermissionToEval && this.user.username !== sid;
  }
}
