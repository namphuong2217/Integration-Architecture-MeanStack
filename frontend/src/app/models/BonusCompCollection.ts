import { Salesman } from './Salesman';
import { OrderEvaluation } from './OrderEvaluation';
import { SocialPerformance } from './SocialPerformance';

export class BonusCompCollection {
  constructor(
    public sid: number,
    public year: number,
    public approvedByCEO: boolean,
    public approvedByHR: boolean,
    public bonusSocial: number[],
    public bonusSocialTotal: number,
    public bonusOrder: [],
    public comments: string[],
    public bonusOrderTotal: number,
    public bonusTotal: number,
    public salesman: Salesman,
    public orderEvaluation: OrderEvaluation[],
    public socialPerformance: SocialPerformance,
    public targets: SocialPerformance
  ) {}
}
