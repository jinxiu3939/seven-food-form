/**
 * `ck-editor`富文本编辑器
 * 适用于文字说明，不适用于多媒体文章
 * depends on ckeditor5 module
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { CKEditorModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-ck-editor',
  templateUrl: `./ck-editor.component.html`,
  styleUrls: [
    `./ck-editor.component.scss`,
  ],
})
export class CKEditorComponent {
  @Input() model: CKEditorModel;
  @Input() form: FormGroup;

  onChange( { editor }: ChangeEvent ) {
    // const data = editor.getData();
    // console.log( data ); // [test]
  }
}
