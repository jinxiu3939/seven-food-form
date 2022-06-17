/**
 * 关键字
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ComponentReset } from '../../providers/interface/component-reset';
import { KeywordModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'ngx-keyword',
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
  showOption = false;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
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
    if (keyword) {
      if (!this.model.value.includes(keyword)) {
        this.model.value.push(keyword); // 新增
        this.form.controls[this.model.name].setValue(this.model.value);
      }
    }
  }

  show() {
    this.showOption = true;
  }

  hide() {
    this.showOption = false;
  }
}
