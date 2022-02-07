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
    comments: string[];
  };

  updateComment(row, val) {
    const index = this.props.orderEvaluations.findIndex((el) => el == row);
    this.props.orderEvaluations[index].comment = val;
  }

  permissionToWriteComment(): boolean {
    return this.props.permissionWriteComments;
  }

  createTableArray(): OrderEvaluation[]{
    let i = 0;
    this.props.orderEvaluations.forEach( order =>{
      order.comment = this.props.comments[i];
      order.bonus = this.props.bonusOrder[i++];
    });
    return this.props.orderEvaluations;
  }
}
