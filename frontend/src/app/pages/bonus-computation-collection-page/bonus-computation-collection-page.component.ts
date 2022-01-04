import { Component, OnInit } from '@angular/core';
import {BonusCompCollection} from '../../models/BonusCompCollection';
import {ActivatedRoute} from '@angular/router';
import {BonusComputationCollectionService} from '../../services/bonus-computation-collection.service';

@Component({
  selector: 'app-bonus-computation-collection',
  templateUrl: './bonus-computation-collection-page.component.html',
  styleUrls: ['./bonus-computation-collection-page.component.css']
})
export class BonusComputationCollectionPageComponent implements OnInit {

  currentSalesmanId: string;
  currentYear: string;
  bonusCompCollection: BonusCompCollection;

  constructor(private bonusCompCollectionService: BonusComputationCollectionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentSalesmanId = this.route.snapshot.paramMap.get('sid');
    this.currentYear = this.route.snapshot.paramMap.get('year');
    this.getBonusCompCollection(this.currentSalesmanId, this.currentYear);
  }

  getBonusCompCollection(sid: string, year: string): void {
    this.bonusCompCollectionService.getBonusComputationCollection(sid, year)
      .subscribe(bonusCompCollection => this.bonusCompCollection = bonusCompCollection);
  }
}
