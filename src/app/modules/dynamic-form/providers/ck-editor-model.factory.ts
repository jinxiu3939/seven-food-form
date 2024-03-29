// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // 导入`ckeditor`模块
// import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'; // 导入`ckeditor`语言包
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块
// import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包

import { ModelType, CKEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const classicEditorConfig = {
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'zh-cn',
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
    ],
  },
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      'imageUpload',
      'undo',
      'redo',
    ],
  },
  blockToolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'insertTable',
    'imageUpload',
    'undo',
    'redo',
  ],
};

/**
 * ckeditor富文本模型工厂
 */
export class CKEditorModelFactory extends BaseModelFactory {
  protected model: CKEditorModel;
  protected type: ModelType = 'ck-editor';

  constructor(obj: any) {
    super(obj);
    /* `editor`配置 */
    this.config.editorConfig = classicEditorConfig;
  }
}
