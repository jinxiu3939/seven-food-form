import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { formatAlertMessage } from '../../helps';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';
import { CheckboxTreeModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-checkbox-tree',
  templateUrl: './checkbox-tree.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class CheckboxTreeComponent implements ComponentReset, OnInit {

  @Input() form: FormGroup;
  @Input() model: CheckboxTreeModel;

  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (! this.model.value || !Array.isArray(this.model.value)) {
      this.model.value = [];
    }
  }

  resetModel() {
    this.model.tree.checked = false
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

  getValue(checked: any[]) {
    if (checked) {
      this.form.controls[this.model.name].setValue(checked); // 表单赋值
    }
  }

}
