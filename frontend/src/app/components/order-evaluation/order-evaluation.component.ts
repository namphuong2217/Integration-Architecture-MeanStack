import { Component, Input} from '@angular/core';
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

  updateComment(row, val) {
    const index = this.bonusCompCollection.orderEvaluation.findIndex(el => el == row);
    this.bonusCompCollection.orderEvaluation[index].comment = val;
  }

  //permissionToWriteComment()
}
