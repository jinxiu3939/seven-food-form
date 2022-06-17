/**
 * 单选按钮组
 * 适用于列表项较少的按钮组
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ComponentReset } from '../../providers/interface/component-reset';
import { CheckboxModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
    './checkbox.component.scss',
  ],
})
export class CheckboxComponent implements OnInit, ComponentReset {
  @Input() model: CheckboxModel;
  @Input() form: FormGroup;

  checkedStatus: boolean[] = []; // 元素选中状态集合

  ngOnInit() {
    this.loadCheckedStatus();
  }

  resetModel() {
    this.loadCheckedStatus();
  }

  /**
   * 加载选中状态
   */
  loadCheckedStatus() {
    this.model.options.map((option, key) => {
      this.checkedStatus[key] = this.isChecked(option.value as string);
    });
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }

  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push('最少选择' + this.model.min + '项');
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push('最多选择' + this.model.max + '项');
    }
    return message;
  }

  /**
   * 切换选中状态
   * 数字转换成字符串比较
   */
  switchChecked(checked: boolean, value: string) {
    this.model.value = this.model.value as string[];
    if (checked) { // 选中
      if (this.isChecked(value) === false) {
        this.model.value.push(value);
      }
    } else { // 取消
      if (this.isChecked(value)) {
        this.model.value = this.model.value.filter(item => item !== value);
      }
    }
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /**
   * 是否选中
   */
  isChecked(value: string): boolean {
    this.model.value = this.model.value as string[];
    // 数字字符串和数字等同
    return this.model.value && (this.model.value.indexOf(value) > -1 || this.model.value.indexOf(value + '') > -1);
  }
}
