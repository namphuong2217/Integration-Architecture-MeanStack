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
    bonusOrderTotal: number;
    orderEvaluations: OrderEvaluation[];
    comments: string[];
  };

  updateComment(row, val) {
    const index = this.props.orderEvaluations.findIndex((el) => el == row);
    this.props.orderEvaluations[index].comment = val;
  }

  permissionToWriteComment(): boolean {
    return this.props.permissionWriteComments;
  }

  createTableArray(): OrderEvaluation[] {
    const orderEvaluations = this.props.orderEvaluations;
    for (let i = 0; i < orderEvaluations.length; i++) {
      const order = orderEvaluations[i];
      order.comment = this.props.comments[i];
      order.bonus = this.props.bonusOrder[i];
    }
    return this.props.orderEvaluations;
  }
}
