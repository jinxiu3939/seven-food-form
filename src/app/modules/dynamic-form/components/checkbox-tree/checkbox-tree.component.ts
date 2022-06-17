import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ComponentReset } from '../../providers/interface/component-reset';
import { CheckboxTreeModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-checkbox-tree',
  templateUrl: './checkbox-tree.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class CheckboxTreeComponent implements ComponentReset {

  @Input() form: FormGroup;
  @Input() model: CheckboxTreeModel;

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
      message.push('最少选择' + this.model.min + '项');
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push('最多选择' + this.model.max + '项');
    }
    return message;
  }

  getValue(checked: any[]) {
    if (checked) {
      this.form.controls[this.model.name].setValue(checked); // 表单赋值
    }
  }

}
