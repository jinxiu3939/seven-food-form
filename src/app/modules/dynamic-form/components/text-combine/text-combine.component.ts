/**
 * 组合输入框
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextCombineModel } from '../../dynamic-form.options';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-text-combine',
  templateUrl: './text-combine.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextCombineComponent implements ComponentReset {

  @Input() model: TextCombineModel;
  @Input() form: FormGroup;

  resetModel() {
  }

  /*
   * 组合值改变
   */
  receive(result, index) {
    this.model.value[index] = result.target.value; // 更新
    this.form.controls[this.model.name].setValue(this.model.value);
  }

}
