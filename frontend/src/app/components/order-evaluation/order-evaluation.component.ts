import { Component, Input } from '@angular/core';
import { OrderEvaluation } from '../../models/OrderEvaluation';

@Component({
  selector: 'app-order-evaluation-dt',
  templateUrl: './order-evaluation.component.html',
  styleUrls: ['./order-evaluation.component.css'],
})
export class OrderEvaluationComponent {
  constructor() {}

  displayedColumns: string[] = [
    'Name of Product',
    'Client',
    'Client Ranking',
    'Items',
    'Bonus',
    'Comment',
  ];

  @Input()
  props: {
    permissionWriteComments: boolean;
    bonusOrder: [];
    orderEvaluations: OrderEvaluation[];
  };

  updateComment(row, val) {
    const index = this.props.orderEvaluations.findIndex((el) => el == row);
    this.props.orderEvaluations[index].comment = val;
  }

  permissionToWriteComment(): boolean {
    return this.props.permissionWriteComments;
  }
}
