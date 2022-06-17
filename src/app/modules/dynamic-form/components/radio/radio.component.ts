/**
 * 单选按钮组
 * 适用于列表项很少的按钮组
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LangProvider } from '../../providers/data/lang.provider';
import { RadioModel } from '../../dynamic-form.options';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'ngx-radio',
  templateUrl: './radio.component.html',
  styleUrls: [
    './radio.component.scss',
  ],
})
export class RadioComponent implements ComponentReset {
  @Input() model: RadioModel;
  @Input() form: FormGroup;

  lang: any;

  constructor(langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
  }
}
