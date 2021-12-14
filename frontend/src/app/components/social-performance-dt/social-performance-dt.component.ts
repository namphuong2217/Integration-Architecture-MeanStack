import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {SocialPerformance} from '../../models/SocialPerformance';

@Component({
  selector: 'app-social-performance-dt',
  templateUrl: './social-performance-dt.component.html',
  styleUrls: ['./social-performance-dt.component.css']
})
export class SocialPerformanceDtComponent implements AfterViewInit {

  // displayedColumns: string[] = ['Criteria', 'Targe Value', 'Actual Value'];
  // data: SocialPerformance;
  // transformedList: object[];
  //
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(private socialPerformanceService: SocialPerformanceService) {

  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    // console.log('run SocialPerformance Service');
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       return this.socialPerformanceService.getPerformanceRecords(
    //         '90123'
    //       ).pipe(catchError(() => observableOf(null)));
    //     })
    //   )
    //   .subscribe(data => (this.data = data));
    // return this.socialPerformanceService.getPerformanceRecords(
    //   '90123'
    // ).subscribe(data => (console.log(data)));
    // this.transformedList.push({'Leadership Competence': this.data[0].leadership_competence});
    // this.transformedList.push({'Openess to Employee': this.data[0].openness});
    // this.transformedList.push({'Social Behavior to Employee': this.data[0].social_behaviour});
    // this.transformedList.push({'Attitude towards Client': this.data[0].attitude});
    // this.transformedList.push({'Communication Skills': this.data[0].comm_skills});
    // this.transformedList.push({'Integrity to Company': this.data[0].integrity});
  }


}
