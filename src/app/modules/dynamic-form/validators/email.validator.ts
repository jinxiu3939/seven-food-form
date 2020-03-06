/**
 * 邮箱验证器
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    const reg = new RegExp('^(.+@.+\..+)?$');
    const success = reg.test(control.value);
    return success ? null : {email: '邮箱格式错误'};
  };

}
