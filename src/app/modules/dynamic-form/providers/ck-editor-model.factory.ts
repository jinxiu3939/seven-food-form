// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // 导入`ckeditor`模块
// import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'; // 导入`ckeditor`语言包
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块
// import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包


import { ModelType, CKEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { deepExtend } from '../helps';

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
    this.config.disabled = false; // 默认不禁用
    /* `editor`配置 */
    this.config.editorConfig = deepExtend({}, classicEditorConfig, this.config.editorConfig);
  }
}
