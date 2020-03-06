/**
 * 通用输入框
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextBoxModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextBoxComponent {

  @Input() model: TextBoxModel;
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
    } else if (control.value) {
      if (control.errors[this.model.validator]) {
        message.push(control.errors[this.model.validator]);
      }
    }
    return message;
  }

}
