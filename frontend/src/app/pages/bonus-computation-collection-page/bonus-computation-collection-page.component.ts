import { Component, OnInit } from '@angular/core';
import { BonusCompCollection } from '../../models/BonusCompCollection';
import { ActivatedRoute } from '@angular/router';
import { BonusComputationCollectionService } from '../../services/bonus-computation-collection.service';
import { Salesman } from '../../models/Salesman';
import { SalesmanService } from '../../services/salesman.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Permissions } from '../../Global';
import { SocialPerformanceTargetService } from 'src/app/services/social-performance-target.service';

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

  constructor(
    private bonusCompCollectionService: BonusComputationCollectionService,
    private socialPerformanceTargetService: SocialPerformanceTargetService,
    private salesmanService: SalesmanService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sid = this.route.snapshot.paramMap.get('sid');
    this.salesmanService
      .getSalesman(this.sid)
      .subscribe((salesman) => (this.currentSalesman = salesman));
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.setBonusCompCollectionAndSalesman(this.sid, this.currentYear);
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

  setBonusCompCollectionAndSalesman(sid: string, year: string): void {
    this.bonusCompCollectionService
      .getBonusComputationCollection(sid, year)
      .subscribe((bonusCompCollection) => {
        this.bonusCompCollection = bonusCompCollection;
        this.currentSalesman = this.bonusCompCollection.salesman;
      });
  }

  selectYearAndEmployee(data) {
    this.currentYear = data.year;
    this.setBonusCompCollectionAndSalesman(data.sid, data.year);
  }

  confirmBonusCompCollection(): void {
    this.bonusCompCollectionService
      .postBonusComputationCollection(this.bonusCompCollection)
      .subscribe((response) => alert(`Bonus confirmed! (id: ${response})`));
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
      permissionWriteComments: Permissions.hasUserPermission(
        this.user,
        'writeComments'
      ),
      bonusOrder: this.bonusCompCollection.bonusOrder,
      orderEvaluations: this.bonusCompCollection.orderEvaluation,
      comments: this.bonusCompCollection.comments,
    };
  }
  createPropsSocialPerformance() {
    return {
      permissionWriteComments: Permissions.hasUserPermission(
        this.user,
        'writeComments'
      ),
      comments: this.bonusCompCollection.comments,
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

  permissionToConfirm() {
    console.log(Permissions.hasUserPermission(this.user, 'confirm'));
    return Permissions.hasUserPermission(this.user, 'confirm');
  }
}
