import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块

import {
  QuickFormFactory,
  CKEditorModelFactory,
} from '../modules/dynamic-form';

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
    uploadUrl: '/ckfinder/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
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

export const ckeditorModels: any = [
  new QuickFormFactory({
    label: '新闻',
    name: 'ckeditor-1',
    value: null,
    require: true,
    editor: ClassicEditor,
    max: 12, // 不推荐使用字数限制，因为字数限制包含html标签，客户端不可见
  }).ckEditor(),
  new CKEditorModelFactory({
    label: '评论',
    name: 'ckeditor-2',
    clear: true,
    value: 'shenmeqingkuang',
    // disabled: true,
    editor: ClassicEditor,
    editorConfig: ckfinderEditorConfig,
  }).instance(),
  // {
  //   type: 'ck-editor',
  //   name: 'introduction-1',
  //   width: 5,
  //   max: 4,
  //   value: '32',
  //   editor: ClassicEditor,
  //   editorConfig: {},
  // },
];
