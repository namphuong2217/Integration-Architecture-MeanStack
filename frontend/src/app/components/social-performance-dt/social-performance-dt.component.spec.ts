import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPerformanceDtComponent } from './social-performance-dt.component';

describe('SocialPerformanceDtComponent', () => {
  let component: SocialPerformanceDtComponent;
  let fixture: ComponentFixture<SocialPerformanceDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPerformanceDtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPerformanceDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
