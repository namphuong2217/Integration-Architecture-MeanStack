import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../../services/salesman.service';
import { BonusComputationCollectionService } from 'src/app/services/bonus-computation-collection.service';
import { Salesman } from '../../models/Salesman';
import { UserService } from '../../services/user.service';
import { Permissions } from '../../Global';
import { User } from '../../models/User';
import { ApprovedBonus } from 'src/app/models/ApprovedBonus';
import { SocialPerformanceService } from 'src/app/services/social-performance.service';
import { SocialPerformanceTargetService } from 'src/app/services/social-performance-target.service';
import {DashboardStatisticsService} from "../../services/dashboard-statistics.service";
import { years } from '../../Global';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  salesmen: Salesman[];
  salesmenCount: number;
  numberOfProducts: string;
  numberOfSales : string;
  year: string;
  years: string[];
  user: User;
  bonusCalculationLink = '/bonus';
  sidsWithTargets: string[];
  hasRated: string[];
  approvedBonuses: ApprovedBonus[];
  buttonEnterSocialPerformance = {
    routerLink: '/enter-social-performance',
  };
  constructor(
    private salesmanService: SalesmanService,
    private userService: UserService,
    private socialPerformanceService: SocialPerformanceService,
    private socialPerformanceTargetService: SocialPerformanceTargetService,
    private bonusComputationCollectionService: BonusComputationCollectionService,
    private dashboardStatisticsService: DashboardStatisticsService
  ) {}

  ngOnInit(): void {
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.salesmanService.getSalesmen().subscribe((salesmen) => {
      this.salesmen = salesmen;
      this.salesmenCount = salesmen.length;
    });
    this.dashboardStatisticsService.getNumberOfProducts().subscribe((numProd)=> (this.numberOfProducts = numProd));
    this.years = years;
    this.year = new Date().getFullYear().toString();
    this.checkTargets();
    this.checkApprovedBonuses();
    this.checkHasRated();
    this.getNumberOfSales(this.year);
  }

  selectYear(year: string) {
    this.year = year;
    this.checkTargets();
    this.checkApprovedBonuses();
    this.checkHasRated();
    this.getNumberOfSales(year)
  }

  getNumberOfSales(year: string){
    this.dashboardStatisticsService.getTotalNumberOfSales(year).subscribe((numSales) => this.numberOfSales = numSales);
  }

  checkTargets() {
    this.socialPerformanceTargetService
      .getPerformanceTargetsExist(this.year)
      .subscribe((sidsWithTargets) => {
        this.sidsWithTargets = sidsWithTargets.targetArray;
      });
  }

  checkHasRated() {
    this.socialPerformanceService.getHasRated(this.year).subscribe((arr) => {
      this.hasRated = arr;
    });
  }

  checkApprovedBonuses() {
    this.bonusComputationCollectionService
      .getApprovedBonuses(this.year)
      .subscribe((res) => {
        this.approvedBonuses = res;
      });
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

  showApprovedOrRated(sid: string) {
    const username = this.user.username;
    const confirmPerm = Permissions.hasUserPermission(this.user, 'confirm');
    return username !== sid && !confirmPerm;
  }

  checkApprovedOrRated(sid: string) {
    const approved = this.approvedBonuses
      .map((bonus) => bonus.sid)
      .includes(sid);
    if (approved) return 'Approved';
    const isRated = this.hasRated.includes(sid);
    if (isRated) return 'Rated';
  }

  getBonusButtonTitle(sid: string) {
    let isApproved = false;
    let sidIndex: number;
    this.approvedBonuses.forEach((bonus, i) => {
      if (bonus.sid === sid) {
        isApproved = true;
        sidIndex = i;
      }
    });
    if (Permissions.hasUserPermission(this.user, 'allBonusCalc')) {
      if (isApproved) {
        if (
          this.user.role === 'Leader' &&
          this.approvedBonuses[sidIndex].approvedByCEO
        ) {
          return 'Bonus Confirmed';
        }
        if (
          this.user.role === 'HR' &&
          this.approvedBonuses[sidIndex].approvedByHR
        ) {
          return 'Bonus Confirmed';
        }
        return 'Confirm Bonus';
      }
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
    const approvedBySID = this.approvedBonuses.map((bonus) => bonus.sid);
    const isApproved = approvedBySID.includes(sid);
    if (isApproved) return false;
    const hasPermissionToEval = Permissions.hasUserPermission(
      this.user,
      'socialPerformanceEval'
    );
    const hasAlreadyRated = this.hasRated.includes(sid);
    return (
      hasPermissionToEval && this.user.username !== sid && !hasAlreadyRated
    );
  }
}
