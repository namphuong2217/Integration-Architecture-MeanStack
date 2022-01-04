import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent{
  years: string[];

  constructor() {
    this.years = ['2021', '2020', '2019', '2018', '2017'];
  }

  @Output() yearSelectedEvent = new EventEmitter<string>();
  @Input() selectedYear = '2021';

  selectYear(value:string){
    this.yearSelectedEvent.emit(value);
  }
}
