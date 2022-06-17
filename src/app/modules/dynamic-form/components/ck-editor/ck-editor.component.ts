/**
 * `ck-editor`富文本编辑器
 * 适用于文字说明，不适用于多媒体文章
 * depends on ckeditor5 module
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { ComponentReset } from '../../providers/interface/component-reset';
import { CKEditorModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-ck-editor',
  templateUrl: `./ck-editor.component.html`,
  styleUrls: [
    `./ck-editor.component.scss`,
  ],
})
export class CKEditorComponent implements ComponentReset {
  @Input() model: CKEditorModel;
  @Input() form: FormGroup;

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
      message.push('最少输入' + this.model.min + '个字符');
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push('最多输入' + this.model.max + '个字符');
    }
    return message;
  }

  onChange( { editor }: ChangeEvent ) {
    // const data = editor.getData();
    // console.log( data ); // [test]
  }
}
