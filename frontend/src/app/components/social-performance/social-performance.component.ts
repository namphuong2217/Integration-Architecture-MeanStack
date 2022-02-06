import { Component, Input } from '@angular/core';
import { SocialPerformance } from '../../models/SocialPerformance';

@Component({
  selector: 'app-social-performance',
  templateUrl: './social-performance.component.html',
  styleUrls: ['./social-performance.component.css'],
})
export class SocialPerformanceComponent {
  constructor() {}

  displayedColumns: string[] = [
    'Criteria',
    'Target Value',
    'Actual Value',
    'Bonus',
    'Comment',
  ];

  @Input()
  props: {
    permissionWriteComments: boolean;
    bonusSocialTotal: number;
    bonusTotal: number;
    socialPerformanceActual: SocialPerformance;
    socialPerformanceTargets: SocialPerformance;
  };

  convertToArrayData(
    socialPerformanceActual: SocialPerformance,
    socialPerformanceTargets: SocialPerformance
  ): object[] {
    const result = [];
    if (socialPerformanceActual.leadershipCompetence) {
      //if defined
      const rowNames = [
        'Leadership Competence',
        'Openess to Employee',
        'Social Behavior to Employee',
        'Attitude towards Client',
        'Communication Skills',
        'Integrity to Company',
      ];
      const fieldNames = [
        'leadershipCompetence',
        'openness',
        'socialBehaviour',
        'attitude',
        'commSkills',
        'integrity',
      ];
      for (let i = 0; i < rowNames.length; i++) {
        const fieldActual = socialPerformanceActual[fieldNames[i]];
        const fieldTarget = socialPerformanceTargets[fieldNames[i]];
        const object = {
          name: rowNames[i],
          target: Number(fieldTarget).toFixed(0),
          actual: Number(fieldActual).toFixed(0),
          // bonus: '' + Number(field.bonus).toFixed(2) + ' €',
          // comment: field.comment,
        };
        result.push(object);
      }
    }
    return result;
  }
}
