import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Salesman } from '../../models/Salesman';
import { Permissions, years } from '../../Global';
import { User } from '../../models/User';

@Component({
  selector: 'app-year-selector',
  templateUrl: './employee-and-year-selector.component.html',
  styleUrls: ['./employee-and-year-selector.component.css'],
})
export class EmployeeAndYearSelectorComponent {
  years: string[] = years;

  @Input() props: {
    user: User;
    page: string;
    selectedSalesman: Salesman;
    selectedYear: string;
    salesmen: Salesman[];
  };

  @Output() selectedEvent = new EventEmitter<{ sid: string; year: string }>();

  selectYearOrEmployee(sid: string, year: string) {
    this.selectedEvent.emit({ sid, year });
  }
}
