/**
 * 范围输入框
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextRangeModel } from '../../dynamic-form.options';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-text-range',
  templateUrl: './text-range.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextRangeComponent implements ComponentReset {

  @Input() model: TextRangeModel;
  @Input() form: FormGroup;

  resetModel() {
    if (this.model) {
      if (!this.model.value) {
        this.model.value = {start: '', end: ''};
      } else if (!this.model.value?.start && !this.model.value?.end) {
        this.model.value = {start: '', end: ''};
      } else if (this.model.value?.start === undefined) {
        this.model.value.start = '';
      } else if (this.model.value?.end === undefined) {
        this.model.value.end = '';
      }
    }
  }

  /*
   * 范围值改变
   */
  receive(result, field) {
    this.model.value[field] = result.target.value; // 更新
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /**
   * 开始范围提示
   */
  get startPlaceholder() {
    return this.model?.placeholder && this.model.placeholder.indexOf('-') > -1 ? this.model.placeholder.split('-')[0] : '';
  }

  /**
   * 结束范围提示
   */
  get endPlaceholder() {
    return this.model?.placeholder && this.model.placeholder.indexOf('-') > -1 ? this.model.placeholder.split('-')[1] : '';
  }
}
