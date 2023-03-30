/**
 * 密码输入框
 * 确认密码为最终表单提交的值
 */
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { formatAlertMessage } from '../../helps';
import { PasswordBoxModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-password-box',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
  templateUrl: `./password-box.component.html`,
})
export class PasswordBoxComponent implements OnInit, ComponentReset  {

  @Input() model: PasswordBoxModel;
  @Input() form: FormGroup;

  lang: any;

  public inputType: string; // 密码类型

  constructor(private cd: ChangeDetectorRef, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.inputType = this.model.visible ? 'text' : 'password';
  }

  resetModel() {
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
    if (control.value) {
      if (control.errors[this.model.validator]) {
        message.push(control.errors[this.model.validator]);
      } else if (this.model.min > 0 && this.model.min > control.value.length) {
        message.push(formatAlertMessage(this.lang.min_input, [this.model.min]));
      } else if (this.model.max > 0 && control.value.length > this.model.max) {
        message.push(formatAlertMessage(this.lang.max_input, [this.model.max]));
      }
    }
    return message;
  }

  validatePassword(value: string) {
    this.model.sureValue = value;
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
