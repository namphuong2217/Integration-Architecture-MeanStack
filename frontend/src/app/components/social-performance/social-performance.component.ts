import { Component, Input } from '@angular/core';
import { SocialPerformance } from '../../models/SocialPerformance';
import { Permissions } from 'src/app/Global';
import { User } from '../../models/User';
import { ratings } from 'src/app/Global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-social-performance',
  templateUrl: './social-performance.component.html',
  styleUrls: ['./social-performance.component.css'],
})
export class SocialPerformanceComponent {
  socialPerformanceRecords: any[];
  ratings = ratings;
  user: User;

  constructor(private userService: UserService) {}

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
    comments: string[];
    bonusSocial: number[];
  };

  ngOnInit() {
    this.userService.getOwnUser().subscribe((user) => (this.user = user));
    this.socialPerformanceRecords = this.convertToArrayData();
  }

  permissionToAlterSocialPerformance() {
    return Permissions.hasUserPermission(this.user, 'alterSocialPerformance');
  }

  updateComment(row, val: string) {
    const index = this.socialPerformanceRecords.findIndex(
      (el) => el.name === row.name
    );
    this.props.comments[index] = val;
  }

  convertToArrayData(): any[] {
    const result = [];
    const socialPerformanceActual = this.props.socialPerformanceActual;
    const socialPerformanceTargets = this.props.socialPerformanceTargets;
    const comments = this.props.comments;
    const bonusSocial = this.props.bonusSocial;
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
        'communicationSkills',
        'integrity',
      ];
      for (let i = 0; i < rowNames.length; i++) {
        const fieldActual = socialPerformanceActual[fieldNames[i]];
        const fieldTarget = socialPerformanceTargets[fieldNames[i]];
        const object = {
          name: rowNames[i],
          target: Number(fieldTarget).toFixed(0),
          actual: Number(fieldActual).toFixed(0),
          bonus: '' + Number(bonusSocial[i]).toFixed(2) + ' €',
          comment: comments[i] ? comments[i] : '',
        };
        result.push(object);
      }
    }
    return result;
  }
}
