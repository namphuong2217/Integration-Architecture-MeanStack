import {Salesman} from "./Salesman";

export class BonusCompCollection{
  constructor(
    public salesman: Salesman,
    public orderEvaluation: string,
    public socialPerformance: string,
  ) {  }
}
