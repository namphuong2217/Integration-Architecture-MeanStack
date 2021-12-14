import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEvaluationDtComponent } from './order-evaluation-dt.component';

describe('OrderEvaluationDtComponent', () => {
  let component: OrderEvaluationDtComponent;
  let fixture: ComponentFixture<OrderEvaluationDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderEvaluationDtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEvaluationDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
