import {PerformanceRecord} from './PerformanceRecord';

export interface SocialPerformance{
    sid: number;
    issuerID: number;
    year: number;
    leadership_competence: PerformanceRecord;
    openness: PerformanceRecord;
    social_behaviour: PerformanceRecord;
    attitude: PerformanceRecord;
    comm_skills: PerformanceRecord;
    integrity: PerformanceRecord;
    constructor(sid : number)
}
