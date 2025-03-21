/**
 * 比较输入框
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextDiffModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-text-diff',
  templateUrl: './text-diff.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextDiffComponent implements ComponentReset {

  @Input() model: TextDiffModel;
  @Input() form: FormGroup;

  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
  }

  /*
   * 范围值改变
   */
  receive(result) {
    this.model.value.text = result.target.value; // 更新
    this.form.controls[this.model.name].setValue(this.model.value);
  }
}
