/**
 * 中国大陆手机号码验证器
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MobileValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    const reg = /^(1[3|4|5|6|7|8|9]\d{9})?$/g;
    const success = reg.test(control.value);
    return success ? null : {mobile: '中国大陆手机号码格式错误'};
  };

}
