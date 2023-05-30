import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  data: string;
  type: string;
  width: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

export interface FormData {
  controls: Map<string,any>
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
  public formData: Object = {};
  public data: FormData = {controls: new Map()};

  constructor(private fb: FormBuilder,private http: HttpClient) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      this.createForm(this.jsonFormData.controls)
    }
  }

  public loadData(data: string): Observable<any> {
    return this.http.get("./assets/" + data);
  }

  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = []; 
      
      if(control.type == "dropdown")
      {
        this.loadData(control.data).subscribe(data => {
          this.data.controls.set(control.name,data);
        });
      }
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
    console.log(this.myForm);
    console.log(this.data);
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

}
