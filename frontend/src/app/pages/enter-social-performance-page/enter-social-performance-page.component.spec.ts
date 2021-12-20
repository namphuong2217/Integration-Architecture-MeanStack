import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSocialPerformancePageComponent } from './enter-social-performance-page.component';

describe('EnterSocialPerformancePageComponent', () => {
  let component: EnterSocialPerformancePageComponent;
  let fixture: ComponentFixture<EnterSocialPerformancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterSocialPerformancePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterSocialPerformancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
