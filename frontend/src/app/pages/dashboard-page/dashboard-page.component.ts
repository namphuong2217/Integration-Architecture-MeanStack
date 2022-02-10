import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../../services/salesman.service';
import { BonusComputationCollectionService } from 'src/app/services/bonus-computation-collection.service';
import { Salesman } from '../../models/Salesman';
import { UserService } from '../../services/user.service';
import { Permissions } from '../../Global';
import { User } from '../../models/User';
import { SocialPerformanceTargetService } from 'src/app/services/social-performance-target.service';
import { years } from '../../Global';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  salesmen: Salesman[];
  salesmenCount: number;
  year: string;
  years: string[];
  user: User;
  bonusCalculationLink = '/bonus';
  sidsWithTargets: string[];
  approvedBonuses: string[];
  buttonEnterSocialPerformance = {
    routerLink: '/enter-social-performance',
  };
  constructor(
    private salesmanService: SalesmanService,
    private userService: UserService,
    private socialPerformanceTargetService: SocialPerformanceTargetService,
    private bonusComputationCollectionService: BonusComputationCollectionService
  ) {}

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.salesmanService.getSalesmen().subscribe((salesmen) => {
      this.salesmen = salesmen;
      this.salesmenCount = salesmen.length;
    });
    this.years = years;
    this.year = new Date().getFullYear().toString();
    this.checkTargets();
    this.checkApprovedBonuses();
  }

  selectYear(year: string) {
    this.year = year;
    this.checkTargets();
  }

  checkTargets() {
    this.socialPerformanceTargetService
      .getPerformanceTargetsExist(this.year)
      .subscribe((sidsWithTargets) => {
        this.sidsWithTargets = sidsWithTargets.targetArray;
      });
  }

  checkApprovedBonuses() {
    this.bonusComputationCollectionService
      .getApprovedBonuses(this.year)
      .subscribe((res) => (this.approvedBonuses = res));
  }

  showBonusCalculation(sid: string): boolean {
    return (
      (Permissions.hasUserPermission(this.user, 'allBonusCalc') &&
        this.sidsWithTargets.includes(sid)) ||
      Permissions.hasUserPermission(this.user, 'writeComments') ||
      (Permissions.hasUserPermission(this.user, 'viewOwnBonusCalc') &&
        sid == this.user.username)
    );
  }

  getBonusButtonTitle(sid: string) {
    if (Permissions.hasUserPermission(this.user, 'allBonusCalc')) {
      if (this.sidsWithTargets.includes(sid)) {
        return 'Confirm Bonus';
      } else {
        return 'Set Target Values';
      }
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
