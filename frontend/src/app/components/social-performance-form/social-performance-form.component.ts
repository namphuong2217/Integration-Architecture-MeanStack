import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SocialPerformanceService} from '../../services/social-performance.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-social-performance-form',
  templateUrl: './social-performance-form.component.html',
  styleUrls: ['./social-performance-form.component.css']
})
export class SocialPerformanceFormComponent implements OnInit {

  @Input()
  currentSalesmanId: string;
  socialPerformanceForm: FormGroup;
  sid: FormControl; // todo sid is always null, not yet know why
  year = new FormControl('');

  leadershipCompetenceTarget = new FormControl('');
  leadershipCompetenceActual = new FormControl('');
  leadershipComment = new FormControl('');

  opennessTarget = new FormControl('');
  opennessActual = new FormControl('');
  opennessComment = new FormControl('');

  socialBehaviourTarget = new FormControl('');
  socialBehaviourActual = new FormControl('');
  socialBehaviourComment = new FormControl('');

  attitudeTarget = new FormControl('');
  attitudeActual = new FormControl('');
  attitudeComment = new FormControl('');

  communicationSkillsTarget = new FormControl('');
  communicationSkillsActual = new FormControl('');
  communicationSkillsComment = new FormControl('');

  integrityTarget = new FormControl('');
  integrityActual = new FormControl('');
  integrityComment = new FormControl('');

  constructor(private socialPerformanceService: SocialPerformanceService, fb: FormBuilder, private route: ActivatedRoute) {
    this.socialPerformanceForm = fb.group({
      sid: this.sid,
      year: this.year,
      leadership_competence: new FormGroup({
        target: this.leadershipCompetenceTarget,
        actual: this.leadershipCompetenceActual,
        comment: this.leadershipComment,
      }),
      openness: new FormGroup({
        target: this.opennessTarget,
        actual: this.opennessActual,
        comment: this.opennessComment,
      }),
      social_behaviour: new FormGroup({
        target: this.socialBehaviourTarget,
        actual: this.socialBehaviourActual,
        comment: this.socialBehaviourComment,
      }),
      attitude: new FormGroup({
        target: this.attitudeTarget,
        actual: this.attitudeActual,
        comment: this.attitudeComment,
      }),
      comm_skills: new FormGroup({
        target: this.communicationSkillsTarget,
        actual: this.communicationSkillsActual,
        comment: this.communicationSkillsComment,
      }),
      integrity: new FormGroup({
        target: this.integrityTarget,
        actual: this.integrityActual,
        comment: this.integrityComment,
      }),
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.socialPerformanceForm.value);
    let form = this.socialPerformanceForm.value;
    form.issuerID = 1000; // todo not hard coded
    this.socialPerformanceService.postSocialPerformanceRecords(this.socialPerformanceForm.value);
  }

  ngOnInit(): void {
    // this.sid = new FormControl(Number(this.currentSalesmanId));
    // this.socialPerformanceForm.value.sid = Number(this.socialPerformanceForm.value.sid);
    this.socialPerformanceForm.value.sid = new FormControl(Number(this.currentSalesmanId)); // todo sid is always null, not yet know why
    // console.log('Init', this.sid.value);
    // console.log('currentSalesmanId', this.currentSalesmanId);
    // console.log('socialPerformanceForm.value.sid', this.socialPerformanceForm.value.sid.value);
    // console.log('socialPerformanceForm.value.sid Number', Number(this.socialPerformanceForm.value.sid));
  }

}
