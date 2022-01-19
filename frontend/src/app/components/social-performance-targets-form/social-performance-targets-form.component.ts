import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ratings } from '../../Global';

@Component({
  selector: 'app-social-performance-targets-form',
  templateUrl: './social-performance-targets-form.component.html',
  styleUrls: ['./social-performance-targets-form.component.css'],
})
export class SocialPerformanceTargetsFormComponent {
  @Output() clickEvent = new EventEmitter<FormGroup>();
  @Input() propSid: string;
  socialPerformanceForm: FormGroup;

  leadershipCompetenceValue = new FormControl('');
  opennessValue = new FormControl('');
  socialBehaviourValue = new FormControl('');
  attitudeValue = new FormControl('');
  communicationSkillsValue = new FormControl('');
  integrityValue = new FormControl('');
  ratings: string[] = ratings;

  constructor(fb: FormBuilder) {
    this.socialPerformanceForm = fb.group({
      leadershipCompetence: this.leadershipCompetenceValue,
      openness: this.opennessValue,
      socialBehaviour: this.socialBehaviourValue,
      attitude: this.attitudeValue,
      communicationSkills: this.communicationSkillsValue,
      integrity: this.integrityValue,
    });
  }

  saveForm() {
    this.socialPerformanceForm.addControl('sid', new FormControl(this.propSid));
    this.clickEvent.emit(this.socialPerformanceForm.value);
  }
}
