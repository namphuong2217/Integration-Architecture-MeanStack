import { Component, OnInit } from '@angular/core';
import { SalesmanService } from '../../services/salesman.service';
import { SocialPerformanceService } from '../../services/social-performance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Salesman } from '../../models/Salesman';
import { Permissions } from '../../Global';

@Component({
  selector: 'app-enter-social-performance-page',
  templateUrl: './enter-social-performance-page.component.html',
  styleUrls: ['./enter-social-performance-page.component.css'],
})
export class EnterSocialPerformancePageComponent implements OnInit {
  header = {
    titleValues: 'Enter values for social performance',
    titleTargets: 'Enter targets for social performance',
  };

  user: User;
  currentSalesman: Salesman;
  currentYear: string;
  salesmen: Salesman[];
  postError: string;
  successMessage: string;

  constructor(
    private userService: UserService,
    private socialPerformanceService: SocialPerformanceService,
    private salesmanService: SalesmanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.salesmanService
      .getSalesmen()
      .subscribe((salesmen) => (this.salesmen = salesmen));
    this.salesmanService
      .getSalesman(this.route.snapshot.paramMap.get('sid'))
      .subscribe((salesman) => (this.currentSalesman = salesman));
  }

  selectYear(data: { year: string }) {
    this.currentYear = data.year;
    const curRoute = this.route.snapshot.routeConfig.path;
    const newRoute = curRoute
      .replace(':sid', this.currentSalesman.sid)
      .replace(':year', this.currentYear);
    this.router.navigate([newRoute]);
  }

  createPropsYearSalesman() {
    return {
      user: this.user,
      page: 'socialPerformance',
      selectedSalesman: this.currentSalesman,
      selectedYear: this.currentYear,
      salesmen: this.salesmen,
    };
  }

  permissionToSeeForm(): boolean {
    return (
      Permissions.hasUserPermission(
        this.user,
        'writeTargetSocialPerformance'
      ) ||
      Permissions.hasUserPermission(this.user, 'writeValueSocialPerformance')
    );
  }

  setPostError = (msg: string) => {
    this.successMessage = '';
    this.postError = msg;
  };

  handleSuccess = () => {
    this.postError = '';
    this.successMessage = 'Success';
  };

  saveForm(socialPerformanceForm) {
    this.socialPerformanceService.postSocialPerformanceRecords(
      socialPerformanceForm,
      this.setPostError,
      this.handleSuccess
    );
  }

  getHeader() {
    let header = '';
    if (
      Permissions.hasUserPermission(this.user, 'writeTargetSocialPerformance')
    ) {
      header = this.header.titleTargets;
    } else if (
      Permissions.hasUserPermission(this.user, 'writeValueSocialPerformance')
    ) {
      header = this.header.titleValues;
    }
    return `<h1>${header}</h1>`;
  }
}
