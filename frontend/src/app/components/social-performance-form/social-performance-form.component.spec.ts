import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPerformanceFormComponent } from './social-performance-form.component';

describe('SocialPerformanceFormComponent', () => {
  let component: SocialPerformanceFormComponent;
  let fixture: ComponentFixture<SocialPerformanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPerformanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPerformanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
