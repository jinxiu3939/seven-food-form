import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块

import {
  QuickFormFactory,
  CKEditorModelFactory,
} from '../modules/dynamic-form';

export const ckeditorModels: any = [
  new QuickFormFactory({
    label: '地区',
    name: 'content-1',
    value: null,
    require: true,
    editor: ClassicEditor,
    max: 12, // 不推荐使用字数限制，因为字数限制包含html标签，客户端不可见
  }).ckEditor(),
  // new CKEditorModelFactory({
  //   label: '族谱',
  //   name: 'description-1',
  //   clear: true,
  //   value: ['A', 1, 'gege'],
  //   disabled: true,
  //   editor: ClassicEditor,
  // }).instance(),
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
