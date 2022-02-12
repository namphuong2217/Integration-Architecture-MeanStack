import { TestBed } from '@angular/core/testing';

import { DashboardStatisticsService } from './dashboard-statistics.service';

describe('DashboardStatisticsService', () => {
  let service: DashboardStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
