import { Component, OnInit, ViewChild } from '@angular/core';
import { BonusCompCollection } from '../../models/BonusCompCollection';
import { ActivatedRoute, Router } from '@angular/router';
import { BonusComputationCollectionService } from '../../services/bonus-computation-collection.service';
import { Salesman } from '../../models/Salesman';
import { SalesmanService } from '../../services/salesman.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Permissions } from '../../Global';
import { SocialPerformanceTargetService } from 'src/app/services/social-performance-target.service';
import { SocialPerformanceComponent } from 'src/app/components/social-performance/social-performance.component';

@Component({
  selector: 'app-bonus-computation-collection',
  templateUrl: './bonus-computation-collection-page.component.html',
  styleUrls: ['./bonus-computation-collection-page.component.css'],
})
export class BonusComputationCollectionPageComponent implements OnInit {
  sid: string;
  user: User;
  currentSalesman: Salesman;
  currentYear: string;
  bonusCompCollection: BonusCompCollection;
  salesmen: Salesman[];
  successMessage: string;
  postError: string;
  hasTargets: boolean;
  noBonusMessage: string;
  confirmedMessage: string;
  confirmedInfoClass: string;
  remarks: string;
  isUpdatedSocialPerformance = false;

  @ViewChild(SocialPerformanceComponent)
  spComponent: SocialPerformanceComponent;

  constructor(
    private bonusCompCollectionService: BonusComputationCollectionService,
    private socialPerformanceTargetService: SocialPerformanceTargetService,
    private salesmanService: SalesmanService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sid = this.route.snapshot.paramMap.get('sid');
    this.salesmanService
      .getSalesman(this.sid)
      .subscribe((salesman) => (this.currentSalesman = salesman));
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.setBonusCompCollectionAndSalesman();
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.salesmanService
      .getSalesmen()
      .subscribe((salesmen) => (this.salesmen = salesmen));
    this.checkHasTargets();
  }

  setPostError = (msg: string) => {
    this.successMessage = '';
    this.postError = msg;
  };

  handleSuccess = () => {
    this.postError = '';
    this.successMessage = 'Success';
    this.checkHasTargets();
    this.setBonusCompCollectionAndSalesman();
  };

  checkHasTargets() {
    this.socialPerformanceTargetService
      .getPerformanceTargetsExist(this.currentYear)
      .subscribe((res) => {
        this.hasTargets = res.targetArray.includes(this.sid);
      });
  }

  saveTargets(socialPerformanceForm) {
    this.socialPerformanceTargetService.postSocialPerformanceTargets(
      socialPerformanceForm,
      this.setPostError,
      this.handleSuccess
    );
  }

  setBonusCompCollectionAndSalesman(): void {
    this.bonusCompCollectionService
      .getBonusComputationCollection(this.sid, this.currentYear)
      .subscribe(
        (bonusCompCollection) => {
          this.bonusCompCollection = bonusCompCollection;
          this.currentSalesman = this.bonusCompCollection.salesman;
        },
        (error) => {
          this.bonusCompCollection = undefined;
          this.noBonusMessage =
            error?.error || 'Bonus has not been approved yet';
        }
      );
  }

  setValuesUpdated(updated: boolean) {
    this.isUpdatedSocialPerformance = updated;
  }

  selectYearAndEmployee(data: { year: string }) {
    this.currentYear = data.year;
    const curRoute = this.route.snapshot.routeConfig.path;
    const newRoute = curRoute
      .replace(':sid', this.currentSalesman.sid)
      .replace(':year', data.year);
    this.router.navigate([newRoute]);
    this.setBonusCompCollectionAndSalesman();
    this.checkHasTargets();
  }

  confirmBonusCompCollection(): void {
    if (this.isUpdatedSocialPerformance) {
      this.updateValues();
      return;
    }
    this.bonusCompCollectionService
      .postBonusComputationCollection(this.bonusCompCollection)
      .subscribe(
        () => {
          this.setBonusCompCollectionAndSalesman();
          this.spComponent.updateSocialPerformance();
        },
        (error) => {
          this.confirmedMessage = error?.error;
          this.confirmedInfoClass = 'error';
        }
      );
  }

  updateValues(): void {
    this.bonusCompCollectionService
      .updateBonusSocialPerformance(this.bonusCompCollection)
      .subscribe(
        (res) => {
          this.bonusCompCollection.approvedByCEO = false;
          this.bonusCompCollection.approvedByHR = true;
          this.setValuesUpdated(false);
          this.bonusCompCollection = res;
        },
        (error) => {
          this.confirmedMessage = error?.error;
          this.confirmedInfoClass = 'error';
        }
      );
  }

  createPropsYearSalesman() {
    return {
      user: this.user,
      page: 'bonusCompCollection',
      selectedSalesman: this.currentSalesman,
      selectedYear: this.currentYear,
      salesmen: this.salesmen,
    };
  }
  createPropsOrderEval() {
    return {
      permissionWriteComments: this.permissionToWriteComments(),
      bonusOrder: this.bonusCompCollection.bonusOrder,
      bonusOrderTotal: this.bonusCompCollection.bonusOrderTotal,
      orderEvaluations: this.bonusCompCollection.orderEvaluation,
      comments: this.bonusCompCollection.orderEvaluationComments,
    };
  }
  createPropsSocialPerformance() {
    return {
      permissionWriteComments: this.permissionToWriteComments(),
      comments: this.bonusCompCollection.socialPerformanceComments,
      bonusSocial: this.bonusCompCollection.bonusSocial,
      bonusSocialTotal: this.bonusCompCollection.bonusSocialTotal,
      bonusTotal: this.bonusCompCollection.bonusTotal,
      socialPerformanceActual: this.bonusCompCollection.socialPerformance,
      socialPerformanceTargets: this.bonusCompCollection.targets,
    };
  }

  permissionToViewFields() {
    if (Permissions.hasUserPermission(this.user, 'allBonusCalc')) {
      return true;
    }
    if (Permissions.hasUserPermission(this.user, 'viewOwnBonusCalc')) {
      return this.user.username == this.currentSalesman.sid;
    }
    return false;
  }

  permissionToWriteComments() {
    const commentPermission = Permissions.hasUserPermission(
      this.user,
      'writeComments'
    );
    return commentPermission && !this.confirmed();
  }

  updateRemarks(val: string) {
    this.bonusCompCollection.remarks = val;
  }

  confirmed() {
    const role = this.user?.role;
    const approvedByCEO = this.bonusCompCollection?.approvedByCEO;
    const approvedByHR = this.bonusCompCollection?.approvedByHR;
    return (
      (role === 'Leader' && approvedByCEO) || (role === 'HR' && approvedByHR)
    );
  }

  confirmButtonText() {
    return this.isUpdatedSocialPerformance ? 'Update and Confirm' : 'Confirm';
  }

  permissionToConfirm() {
    return Permissions.hasUserPermission(this.user, 'confirm');
  }
}
