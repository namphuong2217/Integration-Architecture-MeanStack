import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {SocialPerformanceService} from '../../services/social-performance.service';

@Component({
  selector: 'app-social-performance-form',
  templateUrl: './social-performance-form.component.html',
  styleUrls: ['./social-performance-form.component.css']
})
export class SocialPerformanceFormComponent {

  // @Input() salesmanID = '90123';
  salesmanID = '90123'; // todo not hard coded

  constructor(private socialPerformanceService: SocialPerformanceService) {

  }

  socialPerformanceForm = new FormGroup({
    sid: new FormControl(Number(this.salesmanID)),
    year: new FormControl(''),
    leadership_competence: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
    openness: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
    social_behaviour: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
    attitude: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
    comm_skills: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
    integrity: new FormGroup({
      target: new FormControl(''),
      actual: new FormControl(''),
    }),
  });

  // tslint:disable-next-line:typedef
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.socialPerformanceForm.value);
    let form = this.socialPerformanceForm.value;
    form.issuerID = 1000; // todo not hard coded
    this.socialPerformanceService.postSocialPerformanceRecords(this.socialPerformanceForm.value);
  }

}
