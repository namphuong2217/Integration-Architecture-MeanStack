import { Component, Input } from '@angular/core';
import { Salesman } from '../../models/Salesman';
import { User } from '../../models/User';

@Component({
  selector: 'app-year-selector',
  templateUrl: './employee-and-year-selector.component.html',
  styleUrls: ['./employee-and-year-selector.component.css'],
})
export class EmployeeAndYearSelectorComponent {
  @Input() props: {
    user: User;
    page: string;
    selectedSalesman: Salesman;
    selectedYear: string;
    salesmen: Salesman[];
  };
}
