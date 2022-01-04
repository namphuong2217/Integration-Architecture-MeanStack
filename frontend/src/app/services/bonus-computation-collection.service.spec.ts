import { TestBed } from '@angular/core/testing';

import { BonusComputationCollectionService } from './bonus-computation-collection.service';

describe('BonusComputationCollectionService', () => {
  let service: BonusComputationCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonusComputationCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
