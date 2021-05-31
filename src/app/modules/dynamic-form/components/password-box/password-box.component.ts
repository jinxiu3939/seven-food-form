/**
 * 密码输入框
 * 确认密码为最终表单提交的值
 */
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PasswordBoxModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'ngx-password-box',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
  templateUrl: `./password-box.component.html`,
})
export class PasswordBoxComponent implements OnInit  {

  @Input() model: PasswordBoxModel;
  @Input() form: FormGroup;

  lang: any;

  public inputType: string; // 密码类型

  constructor(private cd: ChangeDetectorRef, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (this.model.empty) {
      this.model.value = null;
      this.form.controls[this.model.name].setValue(null);
    }
    this.inputType = this.model.visible ? 'text' : 'password';
  }

  get password() {
    return this.form.controls[this.model.name].value;
  }

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
      message.push(this.lang.min_input + '：' + this.model.min);
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(this.lang.max_input + '：' + this.model.max);
    } else if (control.value) {
      if (control.errors[this.model.validator]) {
        message.push(control.errors[this.model.validator]);
      }
    }
    return message;
  }

  validatePassword(value: string) {
    if (this.password !== value) {
      this.form.controls[this.model.name].setErrors({
        inputEqual: this.lang.password_not_match,
      });
    } else {
      this.cd.detectChanges();
      this.form.controls[this.model.name].updateValueAndValidity();
    }
  }

}
