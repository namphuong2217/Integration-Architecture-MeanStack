import { Component, OnInit } from '@angular/core';
import { SALESMAN } from "../../mock-data";

@Component({
  selector: 'app-bonus-calculation-page',
  templateUrl: './bonus-calculation-page.component.html',
  styleUrls: ['./bonus-calculation-page.component.css']
})
export class BonusCalculationPageComponent implements OnInit {

  salesman = SALESMAN;
  constructor() { }

  ngOnInit(): void {
  }

}
