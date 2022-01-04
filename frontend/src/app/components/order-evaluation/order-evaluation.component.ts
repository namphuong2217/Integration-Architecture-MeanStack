import { Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BonusCompCollection} from '../../models/BonusCompCollection';

@Component({
  selector: 'app-order-evaluation-dt',
  templateUrl: './order-evaluation.component.html',
  styleUrls: ['./order-evaluation.component.css']
})
export class OrderEvaluationComponent{

  constructor() {}

  displayedColumns: string[] = ['Name of Product', 'Client', 'Client Ranking', 'Items', 'Bonus', 'Comment'];

  @Input()
  bonusCompCollection: BonusCompCollection = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
}
