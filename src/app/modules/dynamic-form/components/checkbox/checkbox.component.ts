/**
 * 多选按钮
 */
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup } from '@angular/forms';

import { formatAlertMessage } from '../../helps';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';
import { CheckboxModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    './checkbox.component.scss',
  ],
})
export class CheckboxComponent implements OnInit, ComponentReset {
  @Input() model: CheckboxModel;
  @Input() form: FormGroup;

  checkedAllStatus: boolean = false; // 是否全部选中
  checkedStatus: boolean[] = []; // 元素选中状态集合
  lang: any;

  constructor(langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (! this.model.value) {
      this.model.value = [];
    }
    this.loadCheckedStatus();
  }

  resetModel() {
    this.loadCheckedStatus();
  }

  /**
   * 加载选中状态
   */
  loadCheckedStatus() {
    if (this.model.options && Array.isArray(this.model.options)) {
      this.model.options.map((option, key) => {
        this.checkedStatus[key] = this.isChecked(option.value as string);
      });
    }
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }

  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push(formatAlertMessage(this.lang.min_select, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.max_select, [this.model.max]));
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
      if (!this.isChecked(value)) {
        this.model.value.push(value);
      }
    } else { // 取消
      if (this.isChecked(value)) {
        this.model.value = this.model.value.filter(item => item !== value && item !== value + '');
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

  /**
   * 拖动排序
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.model.options, event.previousIndex, event.currentIndex);
    
    /* 值排序 */
    const sort = [];
    this.model.options.map((option) => {
      if (this.isChecked(option.value as string)) {
        sort.push(option.value);
      }
    });
    this.model.value.sort((x, y) => sort.indexOf(x) - sort.indexOf(y));

    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /**
   * 切换全选状态
   */
  switchAllChecked(checked: boolean) {
    this.model.value = [];
    if (checked) { // 选中
      this.model.options.forEach((v, k) => {
        this.checkedStatus[k] = true; // 全选
        this.model.value.push(this.model.options[k].value); // 赋值
      });
    } else { // 取消
      this.model.options.forEach((v, k) => {
        this.checkedStatus[k] = false;
      });
    }
    this.form.controls[this.model.name].setValue(this.model.value);
  }  
}
