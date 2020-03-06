/**
 * 密码输入框
 * 确认密码为最终表单提交的值
 */
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PasswordBoxModel } from '../../dynamic-form.options';

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

  public inputType: string; // 密码类型

  constructor(private cd: ChangeDetectorRef) {}

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

  validatePassword(value: string) {
    if (this.password !== value) {
      this.form.controls[this.model.name].setErrors({
        inputEqual: '两次输入不一致',
      });
    } else {
      this.cd.detectChanges();
      this.form.controls[this.model.name].updateValueAndValidity();
    }
  }

}
