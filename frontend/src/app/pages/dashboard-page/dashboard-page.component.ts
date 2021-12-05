import { Component, OnInit } from '@angular/core';
import { SALESMAN } from "../../mock-data";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  salesman = SALESMAN;
  constructor() { }

  ngOnInit(): void {
  }

}
