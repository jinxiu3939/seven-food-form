import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SfFormModel } from '../form.model';
import { SfControlType } from '../control-type.enum';

export interface SfControlOption {
  name: string;
  label?: string;
  required?: boolean;
  validators?: ValidatorFn[];
  disabled?: boolean;
  defaultValue?: any;
  hint?: string;
  errorMessages?: { [key: string]: string };
  columns?: number;
}

export abstract class SfControlModel<T = any> implements SfFormModel {
  type: string = 'control';
  name: string;
  label?: string;
  required: boolean;
  validators: ValidatorFn[];
  disabled: boolean;
  defaultValue?: T;
  hint?: string;
  errorMessages?: { [key: string]: string };
  columns?: number;
  abstract controlType: SfControlType;

  constructor(option: SfControlOption) {
    this.name = option.name;
    this.label = option.label;
    this.required = option.required || false;
    this.validators = option.validators || [];
    this.disabled = option.disabled || false;
    this.defaultValue = option.defaultValue;
    this.hint = option.hint;
    this.errorMessages = option.errorMessages;
    this.columns = option.columns;
  }

  getValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [...this.validators];
    if (this.required) {
      validators.push((control: AbstractControl): ValidationErrors | null => {
        return !control.value ? { required: true } : null;
      });
    }
    return validators;
  }
}
