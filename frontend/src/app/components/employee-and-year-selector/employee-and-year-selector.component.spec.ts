import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAndYearSelectorComponent } from './employee-and-year-selector.component';

describe('YearSelectorComponent', () => {
  let component: EmployeeAndYearSelectorComponent;
  let fixture: ComponentFixture<EmployeeAndYearSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAndYearSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAndYearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
