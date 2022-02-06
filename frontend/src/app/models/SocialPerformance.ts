import { PerformanceRecord } from './PerformanceRecord';

export interface SocialPerformance {
  sid: number;
  issuerID: number;
  year: number;
  leadershipCompetence: PerformanceRecord;
  openness: PerformanceRecord;
  socialBehaviour: PerformanceRecord;
  attitude: PerformanceRecord;
  communicationSkills: PerformanceRecord;
  integrity: PerformanceRecord;
  constructor(sid: number);
}
