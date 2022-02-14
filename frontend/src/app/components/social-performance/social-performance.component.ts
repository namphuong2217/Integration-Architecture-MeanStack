import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { SocialPerformance } from '../../models/SocialPerformance';
import { Permissions } from 'src/app/Global';
import { User } from '../../models/User';
import { ratings } from 'src/app/Global';
import { UserService } from 'src/app/services/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-performance',
  templateUrl: './social-performance.component.html',
  styleUrls: ['./social-performance.component.css'],
})
export class SocialPerformanceComponent {
  socialPerformanceRecords: any[];
  ratings = ratings;
  user: User;

  rowNames = [
    'Leadership Competence',
    'Openess to Employee',
    'Social Behavior to Employee',
    'Attitude towards Client',
    'Communication Skills',
    'Integrity to Company',
  ];
  fieldNames = [
    'leadershipCompetence',
    'openness',
    'socialBehaviour',
    'attitude',
    'communicationSkills',
    'integrity',
  ];

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

  @Output() setValuesUpdated = new EventEmitter<boolean>();

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

  updateRating(distinction: string, name: string, val: string) {
    this.setValuesUpdated.emit(true);
    const index = this.rowNames.findIndex((n) => n === name);
    const fieldName = this.fieldNames[index];
    if (distinction === 'target') {
      this.props.socialPerformanceTargets[fieldName] = val;
    } else if (distinction === 'actual') {
      this.props.socialPerformanceActual[fieldName] = val;
    }
  }

  updateSocialPerformance() {
    console.log('HERE');
    this.socialPerformanceRecords = this.convertToArrayData();
  }

  convertToArrayData(): any[] {
    const result = [];
    const socialPerformanceActual = this.props.socialPerformanceActual;
    const socialPerformanceTargets = this.props.socialPerformanceTargets;
    const comments = this.props.comments;
    const bonusSocial = this.props.bonusSocial;
    if (socialPerformanceActual.leadershipCompetence) {
      for (let i = 0; i < this.rowNames.length; i++) {
        const fieldActual = socialPerformanceActual[this.fieldNames[i]];
        const fieldTarget = socialPerformanceTargets[this.fieldNames[i]];
        const object = {
          name: this.rowNames[i],
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
