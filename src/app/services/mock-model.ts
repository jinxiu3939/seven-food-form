import {
  QuickFormFactory,
  LinkageBoxModelFactory,
} from '../modules/dynamic-form';
import { tree } from './mock-linkage-tree-data';
import { options } from './mock-options';

export const searchModels: any = [
  new QuickFormFactory({
    label: '是否禁用',
    name: 'yes_no1',
    value: null,
    options: null,
    all: true,
  }).booleanRadio(),
  new QuickFormFactory({
    clear: true,
    data: "datePicker",
    disabled: false,
    format: "YYYY-MM-DD HH:mm:ss",
    help: "",
    kind: "date-time",
    label: "结束日期",
    max: 0,
    min: 1,
    name: "creation_date",
    now: false,
    readonly: false,
    order: 0,
    require: false,
    type: "date-picker",
    validator: "",
    value: "",
  }).datePicker(),
  new LinkageBoxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    require: true,
    tree: tree,
    root: 0,
    value: ['A', 1, 'gege']
  }).instance(),

  // new QuickFormFactory({
  //   display: '',
  //   label: '图片',
  //   multiple: false,
  //   name: 'image-1',
  //   uploadConfig: {
  //     authTokenHeader: 'Token',
  //     authToken: 'f74f3khvQQr1rk2KvXTc3Gi4D6W74qJ1YFr5EllmLyXujJAaylfq',
  //     url: '/api/access/upload/image',
  //   },
  //   value: null,
  // }).image(),
  new QuickFormFactory({
    label: '吃的',
    name: 'radio-2',
    options: options,
    searchConfig: {},
    value: '1',
    text: '只读',
    size: 'tiny',
    // readonly: true,
  }).popupRadio(),
  new QuickFormFactory({
    label: '喝的',
    name: 'radio-3',
    options: options,
    searchConfig: {},
    value: '1',
    text: '只读',
    size: 'small',
    // readonly: true,
  }).popupRadio(),
  new QuickFormFactory({
    label: '用的',
    name: 'radio-4',
    options: options,
    searchConfig: {},
    value: '1',
    text: '只读',
    size: 'medium',
    // readonly: true,
  }).popupRadio(),
  new QuickFormFactory({
    label: '模型',
    name: 'model-1',
    value: '',
    text: '只读',
    min: 0,
    max: 0,
    require: true,
    // readonly: true,
  }).textBox(),
  new QuickFormFactory({
    label: '视频-test-lang-and-lang',
    multiple: true,
    max: 2,
    name: 'video-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '3031PAtouX6FtY6u9FPvGsxnZyfG2iWSEBncgHYeFtBV9KZvI28a',
      url: '/api/access/upload/video',
    },
  }).video(),
  new QuickFormFactory({
    label: '多选测试',
    name: 'popup-checkbox-2',
    require: true,
    value: ['A', 1],
    text: {A: '看你的选项', 1: '选项1'},
    options: options,
  }).popupCheckbox(),
  new QuickFormFactory({
    label: '多选测试-2',
    name: 'popup-checkbox-3',
    require: false,
    value: ['A', 1],
    text: {A: '看你的选项', 1: '选项1'},
  }).popupCheckbox(),
];

export const searchSetting = {
  foldBody: false,
  buttonAlign: 'left',
  bodyWidth: 12,
  buttonWidth: 2,
  size: 'extra-large',
  width: 10,
  buttons: [{name: 'export', value: '导出', validate: true}, {name: 'import', value: '导入'}],
  hideSubmit: false,
  submitText: '保存',
  hideReset: false,
  resetText: '全部',
};