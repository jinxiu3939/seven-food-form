import {
  QuickFormFactory,
  MdEditorModelFactory,
} from '../modules/dynamic-form';

export const mdeditorModels: any = [
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-3',
    value: '```hello```',
    editorConfig: {
      readOnly: false,
      imageUploadURL: '/api/access/tool.mdeditor/image?token=123&app-key=239487',
    },
    // height: 400,
    readonly: true,
  }).mdEditor(),
];
