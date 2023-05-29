import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-json-component',
  templateUrl: './json-component.component.html',
  styleUrls: ['./json-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonComponentComponent implements OnChanges {
  @Input() jsonFormData!: JsonFormData;

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      this.createForm(this.jsonFormData.controls)
    }
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value)
      );
    }
  }


  onSubmit() {
    console.log(this.myForm.value);
  }

}
