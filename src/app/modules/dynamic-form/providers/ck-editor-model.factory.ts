// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // 导入`ckeditor`模块
// import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn'; // 导入`ckeditor`语言包
import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块
import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包


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

const ckfinderEditorConfig = {
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
  ckfinder: {
    // Upload the images to the server using the CKFinder QuickUpload command.
    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
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
 * 单选项模型工厂
 */
export class CKEditorModelFactory extends BaseModelFactory {
  protected model: CKEditorModel;
  protected type: ModelType = 'ck-editor';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    /* `editor`配置 */
    let defaultConfig: any;
    switch (obj.kind) {
      // 经典布局
      case 'classic' : {
        defaultConfig = classicEditorConfig;
        break;
      }
      // 经典布局可上传图片
      case 'ckfinder' : {
        defaultConfig = ckfinderEditorConfig;
        break;
      }
      // default
      default : {
        defaultConfig = classicEditorConfig; // 默认使用经典布局
      }
    }
    this.config.editorConfig = deepExtend({}, this.config.editorConfig, defaultConfig);
    this.config.kind = 'classic'; // 默认`build`
  }

  format() {
    switch (this.config.kind) {
      // 经典布局
      case 'classic' : {
        this.model.editor = ClassicEditor;
        break;
      }
      case 'ckfinder' : {
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
