/**
 * 关键字
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { KeywordModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
    './keyword.component.scss',
  ],
})
export class KeywordComponent {
  @Input() model: KeywordModel;
  @Input() form: FormGroup;

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
    if (keyword) {
      if (!this.model.value.includes(keyword)) {
        this.model.value.push(keyword); // 新增
        this.form.controls[this.model.name].setValue(this.model.value);
      }
    }
  }
}
