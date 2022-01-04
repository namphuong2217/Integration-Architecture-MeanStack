import {Component, Input} from '@angular/core';
import {SocialPerformance} from '../../models/SocialPerformance';
import {BonusCompCollection} from '../../models/BonusCompCollection';

@Component({
  selector: 'app-social-performance',
  templateUrl: './social-performance.component.html',
  styleUrls: ['./social-performance.component.css']
})
export class SocialPerformanceComponent{

  displayedColumns: string[] = ['Criteria', 'Target Value', 'Actual Value', 'Bonus', 'Comment'];

  @Input()
  bonusCompCollection: BonusCompCollection = null;

  constructor() { }

  convertToArrayData(socialPerformanceRecords: SocialPerformance): object[] {
    const result = [];
    const rowNames = ['Leadership Competence', 'Openess to Employee', 'Social Behavior to Employee', 'Attitude towards Client',
      'Communication Skills', 'Integrity to Company'];
    const fieldNames = ['leadership_competence', 'openness', 'social_behaviour', 'attitude', 'comm_skills', 'integrity'];
    for (let i = 0; i < rowNames.length; i++) {
      const field = socialPerformanceRecords[fieldNames[i]];
      const object = {
        name: rowNames[i], target: field.target
        , actual: field.actual, bonus: field.bonus, comment: field.comment
      };
      result.push(object);
    }
    return result;
  }
    /*
    const result = [];
    let field = socialPerformanceRecords.leadership_competence;
    let object = { name: 'Leadership Competence', target: field.target
      , actual: field.actual, bonus: field.bonus, comment: field.comment};
    result.push(object);
    object = { name: 'Openess to Employee', target: socialPerformanceRecords.openness.target
      , actual: socialPerformanceRecords.openness.actual};
    result.push(object);
    object = { name: 'Social Behavior to Employee', target: socialPerformanceRecords.social_behaviour.target
      , actual: socialPerformanceRecords.social_behaviour.actual};
    result.push(object);
    object = { name: 'Attitude towards Client', target: socialPerformanceRecords.attitude.target
      , actual: socialPerformanceRecords.attitude.actual};
    result.push(object);
    object = { name: 'Communication Skills', target: socialPerformanceRecords.comm_skills.target
      , actual: socialPerformanceRecords.comm_skills.actual};
    result.push(object);
    object = { name: 'Integrity to Company', target: socialPerformanceRecords.integrity.target
      , actual: socialPerformanceRecords.integrity.actual};
    result.push(object);
    return result;
  }

     */
}
