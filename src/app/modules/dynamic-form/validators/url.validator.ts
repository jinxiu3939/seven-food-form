/**
 * 网址验证器
 */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function UrlValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    const reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#\|]*[\w\-@?^=%&/~\+#])?$/;
    const success = reg.test(control.value);
    return success ? null : {url: 'url格式错误（必须是http、https或ftp开头的网址）'};
  };

}
