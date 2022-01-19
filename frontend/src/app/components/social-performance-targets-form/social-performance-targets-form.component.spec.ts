import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPerformanceTargetsFormComponent } from './social-performance-targets-form.component';

describe('SocialPerformanceTargetsFormComponent', () => {
  let component: SocialPerformanceTargetsFormComponent;
  let fixture: ComponentFixture<SocialPerformanceTargetsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPerformanceTargetsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPerformanceTargetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
