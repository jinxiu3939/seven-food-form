/**
 * 英文单词验证器
 * 只有字母、数字和下划线且只能以字母开头，不能以下划线开头和结尾
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EnglishWordValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    const reg = new RegExp('^((?![_0-9])(?!.*?_$)[a-zA-Z0-9_]+)*$');
    const success = reg.test(control.value);
    return success ? null : {englishWord: '英文单词格式错误（只能包含字母、数字或下划线且只能以字母开头，不能以下划线开头和结尾）'};
  };

}
