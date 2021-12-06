import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrdersDataTableDataSource, OrdersDataTableItem } from './orders-data-table-datasource';

@Component({
  selector: 'app-orders-data-table',
  templateUrl: './orders-data-table.component.html',
  styleUrls: ['./orders-data-table.component.css']
})
export class OrdersDataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrdersDataTableItem>;
  dataSource: OrdersDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Name of Product', 'Client', 'Client Ranking', 'Items'];

  constructor() {
    this.dataSource = new OrdersDataTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
