import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderEvaluation} from '../../models/OrderEvaluation';
import {OrderService} from '../../services/order.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-order-evaluation-dt',
  templateUrl: './order-evaluation-dt.component.html',
  styleUrls: ['./order-evaluation-dt.component.css']
})
export class OrderEvaluationDtComponent implements AfterViewInit {

  displayedColumns: string[] = ['Name of Product', 'Client', 'Client Ranking', 'Items'];
  data: OrderEvaluation[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {

  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.orderService.getOrderEvaluation(
            '90123', '2018'
          ).pipe(catchError(() => observableOf(null)));
        })
      )
      .subscribe(data => (this.data = data));
  }


}
