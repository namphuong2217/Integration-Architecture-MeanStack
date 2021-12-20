import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPerformanceComponent } from './social-performance.component';

describe('SocialPerformanceComponent', () => {
  let component: SocialPerformanceComponent;
  let fixture: ComponentFixture<SocialPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
