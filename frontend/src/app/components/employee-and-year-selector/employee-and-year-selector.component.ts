import {Component, EventEmitter, Input, Output} from '@angular/core';
import {years} from "../../Global";
import {Salesman} from "../../models/Salesman";

@Component({
  selector: 'app-year-selector',
  templateUrl: './employee-and-year-selector.component.html',
  styleUrls: ['./employee-and-year-selector.component.css']
})
export class EmployeeAndYearSelectorComponent {
  years: string[] = years;

  @Input() props : {selectedSalesman : Salesman,
                    selectedYear : string,
                    salesmen: Salesman[]};

  @Output() selectedEvent = new EventEmitter<{ sid: string, year: string }>();

  selectYearOrEmployee(sid:string, year:string){
    this.selectedEvent.emit({sid,year});
  }

}
