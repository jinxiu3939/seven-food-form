/**
 * 普通文本域
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextAreaModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class TextAreaComponent implements ComponentReset {
  @Input() model: TextAreaModel;
  @Input() form: FormGroup;

  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
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
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push(this.lang.min_input + '：' + this.model.min);
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(this.lang.max_input + '：' + this.model.max);
    }
    return message;
  }
}
