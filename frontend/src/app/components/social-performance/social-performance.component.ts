import { Component, OnInit } from '@angular/core';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {catchError} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {SocialPerformance} from '../../models/SocialPerformance';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

@Component({
  selector: 'app-social-performance',
  templateUrl: './social-performance.component.html',
  styleUrls: ['./social-performance.component.css']
})
export class SocialPerformanceComponent implements OnInit {

  socialPerformanceRecords: SocialPerformance;
  data: Array<any>;
  displayedColumns: string[] = ['Criteria', 'Target Value', 'Actual Value'];
  constructor(private socialPerformanceService: SocialPerformanceService) { }

  ngOnInit(): void {
    this.socialPerformanceService.getPerformanceRecords(
      '90123'
    ).pipe(catchError(() => observableOf(null)))
      .subscribe( data => {
        this.socialPerformanceRecords = data[0];
        // console.log(this.socialPerformanceRecords);
        // console.log(data[0]);
        this.data = this.converToArrayData(this.socialPerformanceRecords);
        console.log('Data after converting', this.data);
      });
  }

  converToArrayData(socialPerformanceRecords: SocialPerformance): object[]{
    const result = [];
    let object = { name: 'Leadership Competence', target: socialPerformanceRecords.leadership_competence.target
      , actual: socialPerformanceRecords.leadership_competence.actual};
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
}
