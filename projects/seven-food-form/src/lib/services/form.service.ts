import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SfGroupModel } from '../models/layouts/group.model';
import { SfControlModel } from '../models/controls/control.model';
import { SfArrayModel } from '../models/layouts/array.model';
import { SfFormModel } from '../../public-api';

@Injectable({ providedIn: 'root' })
export class SfFormService {
  constructor(private fb: FormBuilder) {}

  createFormGroupFromModel(model: SfGroupModel): FormGroup {
    return this.createFormGroupFromModels(model.models);
  }

  createFormGroupFromModels(models: SfFormModel[]): FormGroup {
    const group: any = {};

    models.forEach(model => {
      if (model instanceof SfGroupModel) {
        group[model.name] = this.createFormGroupFromModels(model.models);
      } else if (model instanceof SfArrayModel) {
        group[model.name] = this.createFormArrayFromModel(model);
      } else if (model instanceof SfControlModel) {
        group[model.name] = this.createFormControl(model);
      }
    });

    return this.fb.group(group);
  }

  private createFormArrayFromModel(model: SfArrayModel): FormArray {
    const items: FormGroup[] = [];
    const minItems = model.minItems || 0;

    for (let i = 0; i < minItems; i++) {
      items.push(this.createFormGroupFromModels(model.models));
    }

    return this.fb.array(items);
  }

  private createFormControl(model: SfControlModel): FormControl {
    const validators = model.getValidators();
    return this.fb.control(
      { value: model.defaultValue || '', disabled: model.disabled },
      validators
    );
  }

  getFormValue(formGroup: FormGroup): any {
    const result: any = {};

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        result[key] = this.getFormValue(control);
      } else if (control instanceof FormArray) {
        result[key] = control.value;
      } else {
        result[key] = control?.value;
      }
    });

    return result;
  }

  triggerControlReset(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormGroup) {
        this.triggerControlReset(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(item => {
          if (item instanceof FormGroup) {
            this.triggerControlReset(item);
          } else if ((item as any).resetControl) {
            (item as any).resetControl();
          }
        });
      } else {
        if ((control as any).resetControl) {
          (control as any).resetControl();
        }
      }
    });
  }
}
