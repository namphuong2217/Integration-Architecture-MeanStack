import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {OrdersDataTableDataSource, OrdersDataTableItem} from '../../orders-data-table/orders-data-table-datasource';
import {OrderEvaluation} from '../../models/OrderEvaluation';
import {OrderService} from '../../services/order.service';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

const EXAMPLE_DATA: OrderEvaluation[] = [
  {
    nameProduct: 'German1',
    client: 'Germana GmbH',
    clientRanking: 'good',
    items: '2500.000000000'
  }
];

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
            '90123'
          ).pipe(catchError(() => observableOf(null)));
        })
      )
      .subscribe(data => (this.data = data));
  }

  // tslint:disable-next-line:typedef
  // getAllOrdersEvaluation(){
  //   this.orderService.getOrderEvaluation('90123')
  //     .subscribe(orders => this.dataSource.data = orders as OrderEvaluation[]);
  // }

}
