/**
 * 关键字
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { formatAlertMessage } from '../../helps';
import { ComponentReset } from '../../providers/interface/component-reset';
import { KeywordModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'sff-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
    './keyword.component.scss',
  ],
})
export class KeywordComponent implements ComponentReset {
  @Input() model: KeywordModel;
  @Input() form: FormGroup;

  lang: any;
  isOption = false;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
  }

  /**
   * 显示可选项
   */
  showOption() {
    this.isOption = true;
  }

  /*
   * 删除关键字
   */
  delete(keyword) {
    this.model.value = this.model.value.filter(r => r !== keyword);
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /*
   * 新增关键字
   */
  add(keyword) {
    if (keyword.value) {
      this.insert(keyword.value);
      keyword.value = '';
    }
  }

  insert(value) {
    if (value) {
      if (!this.model.value.includes(value)) {
        this.model.value.push(value); // 新增
        this.form.controls[this.model.name].setValue(this.model.value);
      }
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
      message.push(formatAlertMessage(this.lang.input_down, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.input_up, [this.model.max]));
    }
    return message;
  }


  /**
   * 拖动排序
   * @param event 
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.model.value, event.previousIndex, event.currentIndex);

    this.form.controls[this.model.name].setValue(this.model.value);
  }
}
