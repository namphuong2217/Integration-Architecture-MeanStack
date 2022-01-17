import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SocialPerformanceService} from '../../services/social-performance.service';
import {ratings} from "../../Global";

@Component({
  selector: 'app-social-performance-form',
  templateUrl: './social-performance-form.component.html',
  styleUrls: ['./social-performance-form.component.css']
})
export class SocialPerformanceFormComponent{

  @Output() clickEvent = new EventEmitter<FormGroup>();
  socialPerformanceForm: FormGroup;

  leadershipCompetenceValue = new FormControl('');
  opennessValue = new FormControl('');
  socialBehaviourValue = new FormControl('');
  attitudeValue = new FormControl('');
  communicationSkillsValue = new FormControl('');
  integrityValue = new FormControl('');
  ratings : string[] = ratings;

  constructor(private socialPerformanceService: SocialPerformanceService, fb: FormBuilder) {
    this.socialPerformanceForm = fb.group({
      leadershipCompetence: new FormGroup({
        value: this.leadershipCompetenceValue
      }),
      openness: new FormGroup({
        value: this.opennessValue
      }),
      socialBehaviour: new FormGroup({
        value: this.socialBehaviourValue
      }),
      attitude: new FormGroup({
        value: this.attitudeValue
      }),
      communicationSkills : new FormGroup({
        value: this.communicationSkillsValue
      }),
      integrity: new FormGroup({
        value: this.integrityValue
      }),
    });
  }

  saveForm() {
    this.clickEvent.emit(this.socialPerformanceForm.value);
  }
}
