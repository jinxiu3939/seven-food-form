/**
 * 字母名称验证器
 * 只有字母、数字、中横线和下划线
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function LetterNameValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: string } => {
    const reg = new RegExp('^[a-zA-Z0-9_\-]*$');
    const success = reg.test(control.value);
    return success ? null : {letterName: '字母格式错误（只能包含字母、数字、中横线或下划线）'};
  };

}
