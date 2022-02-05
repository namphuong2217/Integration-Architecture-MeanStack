import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../../services/salesman.service';
import { Salesman } from '../../models/Salesman';
import { UserService } from '../../services/user.service';
import { Permissions } from '../../Global';
import { User } from '../../models/User';
import {SocialPerformanceTargetService} from "../../services/social-performance-target.service";

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
  buttonBonusCalculation = {
    title: 'Bonus Calculation',
    titleCEO: 'Confirm Bonus',
    routerLink: '/bonus' };
  buttonEnterSocialPerformance = {
    title: 'Rate Social Performance',
    titleCEO: 'Determine Social Performance Target',
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
    return hasPermissionToEval && this.user.username !== sid;
  }

  ifCurrentUserIsCEO(): boolean {
    return this.user.role == "Leader";
  }

  ifCurrentUserIsHR(): boolean {
    return this.user.role == "HR";
  }

}
