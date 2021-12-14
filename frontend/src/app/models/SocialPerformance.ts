import {PerformanceRecord} from './PerformanceRecord';

export class SocialPerformance{
  constructor(
    public sid: string,
    public year: string,
    // tslint:disable-next-line:variable-name
    public leadership_competence: PerformanceRecord,
    public items: string,
  ) {  }
}
