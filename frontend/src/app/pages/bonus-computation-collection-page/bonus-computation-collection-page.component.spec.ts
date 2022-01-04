import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusComputationCollectionPageComponent } from './bonus-computation-collection-page.component';

describe('BonusComputationCollectionComponent', () => {
  let component: BonusComputationCollectionPageComponent;
  let fixture: ComponentFixture<BonusComputationCollectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusComputationCollectionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusComputationCollectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
