import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // 导入`ckeditor`模块
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'; // 导入`ckeditor`语言包

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
};

/**
 * 单选项模型工厂
 */
export class CKEditorModelFactory extends BaseModelFactory {
  protected model: CKEditorModel;
  protected type: ModelType = 'ck-editor';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    /* `editor`配置 */
    switch (obj.kind) {
      // 经典布局
      case 'classic' : {
        this.config.editorConfig = classicEditorConfig;
        break;
      }
      // [todo] other
      // default
      default : {
        this.config.editorConfig = classicEditorConfig; // 默认使用经典布局
      }
    }
    this.config.kind = 'classic'; // 默认`build`
  }

  format() {
    switch (this.config.kind) {
      // 经典布局
      case 'classic' : {
        this.model.editor = ClassicEditor;
        break;
      }
      // [todo] other
      // default
      default : {
        this.model.editor = ClassicEditor; // 默认使用经典布局
      }
    }
  }
}
