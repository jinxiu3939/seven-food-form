import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LinkageBoxTreeModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-linkage-box',
  templateUrl: './linkage-box.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class LinkageBoxComponent {

  @Input() form: FormGroup;
  @Input() model: LinkageBoxTreeModel;

  getValue(selected: any) {
    if (selected) {
      this.form.controls[this.model.name].setValue(selected); // 表单赋值
    }
  }

}
