import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {SocialPerformance} from '../../models/SocialPerformance';
import {SocialPerformanceService} from '../../services/social-performance.service';

@Component({
  selector: 'app-social-performance-form',
  templateUrl: './social-performance-form.component.html',
  styleUrls: ['./social-performance-form.component.css']
})
export class SocialPerformanceFormComponent {
  // name = new FormControl('');

  constructor(private socialPerformanceService: SocialPerformanceService) {

  }

  socialPerformanceForm = new FormGroup({
    sid: new FormControl(90123),
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
    console.warn(this.socialPerformanceForm.value);
    this.socialPerformanceService.postSocialPerformanceRecords(this.socialPerformanceForm.value);
  }

}


