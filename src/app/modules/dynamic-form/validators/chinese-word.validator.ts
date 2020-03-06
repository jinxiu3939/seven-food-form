/**
 * 中文验证器
 *
 * CJK 统一表意符号扩展 A：\u3400-\u4db5
 * CJK 统一表意符号（常用）：\u4e00-\u9fc6
 * CJK 兼容象形文字：\uf900-\ufa6d
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ChineseWordValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    const reg = new RegExp('^([\u3400-\u4db5\u4e00-\u9fc6\uf900-\ufa6d]+)*$');
    const success = reg.test(control.value);
    return success ? null : {chineseWord: '中文格式错误'};
  };

}
