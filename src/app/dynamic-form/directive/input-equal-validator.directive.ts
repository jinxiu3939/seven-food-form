import { Directive, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: `[ngxInputEqualValidator]`,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputEqualValidatorDirective),
      multi: true,
    },
  ],
})
export class InputEqualValidatorDirective implements Validator {
  @Input() equalValue: string;

  validate(control: AbstractControl): { [key: string]: any } {
    if (control.value && control.value !== this.equalValue) {
      return { inputEqual: '两次输入不一致' };
    }
    return null;
  }
}
