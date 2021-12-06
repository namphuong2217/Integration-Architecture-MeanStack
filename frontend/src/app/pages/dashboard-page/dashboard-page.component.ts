import { Component, OnInit } from '@angular/core';
import { SALESMEN } from "../../mock-data";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  salesman = SALESMEN;
  button = {title: 'Bonus Calculation', routerLink: 'bonus-calculation'};
  constructor() { }

  ngOnInit(): void {
  }

}
