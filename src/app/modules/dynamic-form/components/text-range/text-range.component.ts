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
  }

  /*
   * 范围值改变
   */
  receive(result, field) {
    this.model.value[field] = result.target.value; // 更新
    this.form.controls[this.model.name].setValue(this.model.value);
  }
}
