import { Component, OnInit } from '@angular/core';
import {BonusCompCollection} from '../../models/BonusCompCollection';
import {ActivatedRoute} from '@angular/router';
import {BonusComputationCollectionService} from '../../services/bonus-computation-collection.service';
import {Salesman} from "../../models/Salesman";
import {SalesmanService} from "../../services/salesman.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Permissions} from "../../Global";

@Component({
  selector: 'app-bonus-computation-collection',
  templateUrl: './bonus-computation-collection-page.component.html',
  styleUrls: ['./bonus-computation-collection-page.component.css']
})
export class BonusComputationCollectionPageComponent implements OnInit {

  user: User;
  currentSalesman: Salesman;
  currentYear: string;
  bonusCompCollection: BonusCompCollection;
  salesmen: Salesman[];

  constructor(private bonusCompCollectionService: BonusComputationCollectionService, private salesmanService: SalesmanService,
  private userService : UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.setBonusCompCollectionAndSalesman(this.route.snapshot.paramMap.get('sid'), this.currentYear);
    this.userService.getOwnUser().subscribe(user => this.user = user);
    this.salesmanService.getSalesmen().subscribe( salesmen => this.salesmen = salesmen);
  }

  setBonusCompCollectionAndSalesman(sid: string, year: string): void {
    this.bonusCompCollectionService.getBonusComputationCollection(sid, year)
      .subscribe(bonusCompCollection => {this.bonusCompCollection = bonusCompCollection;
        this.currentSalesman = this.bonusCompCollection.salesman;});
  }

  selectYearAndEmployee(data){
    this.currentYear = data.year;
    this.setBonusCompCollectionAndSalesman(data.sid, data.year);
  }

  confirmBonusCompCollection(): void{
    console.log(this.bonusCompCollection);
    this.bonusCompCollectionService.postBonusComputationCollection(this.bonusCompCollection)
    .subscribe(response => alert(`Bonus confirmed! (id: ${response})`));
  }

  createPropsYearSalesman(){
    return{
      user : this.user,
      page : 'bonusCompCollection',
      selectedSalesman : this.currentSalesman,
      selectedYear : this.currentYear,
      salesmen : this.salesmen
    }
  }
  createPropsOrderEval(){
    return{
      permissionWriteComments : Permissions.hasUserPermission(this.user, 'writeComments'),
      bonusOrder : this.bonusCompCollection.bonusOrder,
      orderEvaluations : this.bonusCompCollection.orderEvaluation
    };
  }
  createPropsSocialPerformance(){
    return{
      permissionWriteComments : Permissions.hasUserPermission(this.user, 'writeComments'),
      bonusSocial : this.bonusCompCollection.bonusSocial,
      bonusTotal : this.bonusCompCollection.bonusTotal,
      socialPerformance : this.bonusCompCollection.socialPerformance
    }
  }

  permissionToViewFields(){
    if(Permissions.hasUserPermission(this.user, 'allBonusCalc')){
      return true;
    }
    if(Permissions.hasUserPermission(this.user, 'viewOwnBonusCalc')){
      return this.user.username == this.currentSalesman.sid;
    }
    return false;
  }

  permissionToConfirm(){
    return Permissions.hasUserPermission(this.user, 'confirm');
  }
}
