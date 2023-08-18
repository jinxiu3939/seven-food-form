/**
 * 文件
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ComponentReset } from '../../providers/interface/component-reset';
import { FileModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-file',
  templateUrl: './file.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class FileComponent implements ComponentReset {

  @Input() model: FileModel;
  @Input() form: FormGroup;

  resetModel() {
  }

  setValue(e): void {
    if (e.target.files.length > 0) {
      this.form.controls[this.model.name].setValue(e.target.files[0]); // 表单赋值
    }
  }

}
