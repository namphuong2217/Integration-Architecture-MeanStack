import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCalculationPageComponent } from './bonus-calculation-page.component';

describe('BonusCalculationPageComponent', () => {
  let component: BonusCalculationPageComponent;
  let fixture: ComponentFixture<BonusCalculationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusCalculationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusCalculationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
