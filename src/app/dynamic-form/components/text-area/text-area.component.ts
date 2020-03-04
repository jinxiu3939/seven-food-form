/**
 * 普通文本域
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextAreaModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextAreaComponent {
  @Input() model: TextAreaModel;
  @Input() form: FormGroup;

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }

  get valid() {
    const control = this.form.controls[this.model.name];
    return control.value && control.valid;
  }

  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push('最少输入' + this.model.min + '个字符');
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push('最多输入' + this.model.max + '个字符');
    }
    return message;
  }
}
