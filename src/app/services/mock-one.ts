import {
  QuickFormFactory,
  KeywordModelFactory,
} from '../modules/dynamic-form';
import { checkboxTree } from './mock-checkbox-tree-data';
import { images } from './mock-images-data';
import { options } from './mock-options';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块

export const appKey = 'wen-DFOeite.hte';
export const token = '6755AnY6vbqYGN7EWK5jjiTvj5bN+tudnAVGhm6ppFIWv2UkFiJE';
export const oneLayoutModels = [
  {
    label: '日期范围选择',
    name: 'date-range-1',
    type: 'date-range-picker',
    value: false,
    disabled: false,
    format: 'MM-DD-YYYY',
    order: 1,
    require: true,
    validator: '',
    block: 1,   
  },
  new QuickFormFactory({
    label: '族谱',
    name: 'tree1',
    tree: checkboxTree,
    value: ['12', '11'],
    block: 1,
  }).checkboxTree(),
  new QuickFormFactory({
    label: '验证码',
    name: 'password-2',
    max: 10,
    block: 39,
  }).passwordBox(),
  new KeywordModelFactory({
    label: '关键字',
    name: 'keyword',
    value: '',
    readonly: false,
    block: 1,
  }).instance(),
  {
    label: '标签',
    name: 'tag-3',
    type: 'keyword',
    value: ['demo'],
    help: 'this is a video',
    order: 1,
    validator: '',
    readonly: true,
    block: 1,
  },
  new QuickFormFactory({
    display: '',
    label: '图片',
    multiple: true,
    name: 'image-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: token,
      url: '/api/access/upload/image',
    },
    value: null,
    list: images,
    block: 1,
  }).image(),
  new QuickFormFactory({
    label: '颜色',
    name: 'color',
    type: 'radio',
    options: [
      { text: '红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色' },
      { text: '绿色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'green', title : '大自然的颜色', items: 100 },
      { text: '绿色', value: 'green', title : '大自然的颜色', items: 6 },
      { text: '绿色', value: 'green', title : '大自然的颜色', items: 0 },
      { text: '绿色', value: 'green', title : '大自然的颜色' },
    ],
    value: 'red',
    width: 3,
    block: 1,
  }).radio(),
  new QuickFormFactory({
    label: '必填颜色',
    name: 'color',
    type: 'radio',
    options: [
      { text: '红色红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色'},
      { text: '绿色颜色一种颜色一种颜色一种颜色颜色一种颜一颜色一种颜', value: 'green', title : '大自然的颜色', items: 1000 },
      { text: '红色', value: 'red', title : '一种颜色' },
      { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
      { text: '红色一种颜色一种颜色一种颜色一种颜色一种颜色', value: 'red', title : '一种颜色' },
      { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
    ],
    value: ['red'],
    width: 3,
    block: 1,
    require: true,
  }).checkbox(),
  {
    label: '颜色',
    name: 'color2',
    options: [
      { text: '红色', value: 'red', title : '一种颜色', items: '99+' },
      { text: '绿色', value: 'green', title : '大自然的颜色', items: 10 },
      { text: '青色', value: 'cyan', title : '大自然的颜色' },
    ],
    type: 'checkbox',
    value: ['red'],
    disabled: false,
    help: 'this is a checkbox demo',
    max: 10,
    min: 3,
    order: 1,
    require: true,
    validator: '',
    block: 1,
  },
  // new QuickFormFactory({
  //   label: '是否禁用',
  //   name: 'yes_no1',
  //   value: null,
  //   options: null,
  //   all: true,
  //   block: 1,
  // }).booleanRadio(),
  {
    label: '是否禁用',
    name: 'yes_no3',
    options: [
      { text: '是', value: true },
      { text: '否', value: false, items: '99+' },
      { text: '全部', value: true },
    ],
    type: 'radio',
    value: false,
    disabled: false,
    help: 'this is a radio demo',
    order: 1,
    require: true,
    validator: '',
    block: 1,   
  },
  new QuickFormFactory({
    label: '下拉框',
    name: 'drop-down-1',
    options: [
      { text: '全部', value: '', title : '全部' },
      { text: '苹果', value: 'apple', title : '一种水果' },
      { text: '梨', value: 'pear', title : '一种水果' },
    ],
    block: 1,
  }).dropDownBox(),
  new QuickFormFactory({
    label: '自动全部下拉框',
    name: 'drop-down-no-all',
    options: [
      { text: '苹果', value: 'apple', title : '一种水果' },
      { text: '梨', value: 'pear', title : '一种水果' },
    ],
    block: 1,
    value: 'apple',
    disabled: true,
  }).dropDownBox(),
  new QuickFormFactory({
    label: '同步关联',
    name: 'field_id-2',
    options: options,
    searchConfig: {},
    value: '1',
    text: '只读',
    size: '',
    // readonly: true,
    block: 1,
  }).popupRadio(),
  new QuickFormFactory({
    label: '模型',
    name: 'model-2',
    value: '',
    text: '只读',
    min: 0,
    max: 0,
    require: true,
    // readonly: true,
    block: 1,
  }).textBox(),
  new QuickFormFactory({
    label: '内容',
    name: 'content-1',
    kind: 'ckfinder',
    editorConfig: {
      ckfinder: {
        // Upload the images to the server using the CKFinder QuickUpload command.
        uploadUrl: '/ckfinder/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
      }
    },
    require: false,
    editor: ClassicEditor,
    block: 2,
  }).ckEditor(),
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-1',
    require: true,
    kind: 'classic',
    editorConfig: {
      token: token,
    },
    block: 2,
    value: "<h1>hellow world</h1>"
  }).uEditor(),
  new QuickFormFactory({
    clear: true,
    data: "datePicker",
    disabled: false,
    format: "yyyy-MM-DD HH:mm:ss",
    help: "",
    kind: "date-time",
    label: "结束日期",
    max: 0,
    min: 1,
    name: "end_date",
    now: false,
    readonly: false,
    order: 0,
    require: true,
    type: "date-picker",
    validator: "",
    value: "3923980-309",
    block: 2,
  }).datePicker(),
  new QuickFormFactory({
    clear: false,
    data: "datePicker",
    disabled: false,
    format: "YYYY-MM-DD HH:mm:ss",
    help: "",
    kind: "date",
    label: "开始日期",
    max: 0,
    min: 0,
    name: "start_date",
    now: false,
    order: 0,
    require: false,
    type: "date-picker",
    validator: "",
    value: "2020-11-14 09:08",
    block: 2,
  }).datePicker(),
  new QuickFormFactory({
    label: '附件',
    name: 'file',
    kind: ['json', 'xls'],
    download: 'http://api.oss.localhost',
    block: 2,
    disabled: true,
  }).file(),
  new QuickFormFactory({
    label: '富文本内容',
    name: 'content-body-2',
    // kind: 'classic',
    editorConfig: {
      token: token,
    },
    block: 3,
  }).uEditor(),
  {
    label: '下拉框',
    name: 'drop-down-3',
    type: 'drop-down-box',
    value: '',
    help: 'this is a text area',
    options: [
      { text: '苹果', value: 'apple', title : '一种水果' },
      { text: '梨', value: 'pear', title : '一种水果' },
    ],
    require: true,
    order: 1,
    placeholder: '',
    validator: '',
    block: 3,
  },
];
export const oneLayoutSetting = {
  foldBody: false,
  bodyWidth: 9,
  validate: true,
  buttonFixed: false,
  buttonPosition: 'right',
  buttons: [
    {value: 'export', name: 'export'},
    {value: 'import', name: 'import'},
  ],
  blockLayout: 'ul',
  children: [
    {
      blockId: 1,
      blockTitle: "活命1",
      validate: true,
      hideBlockBody: true,
    },
    {
      blockId: 2,
      blockTitle: "活命2",
      width: 9,
      validate: true,
    },
    {
      blockId: 3,
      blockTitle: "富文本",
      validate: true,
    },
    {
      blockId: 4,
      blockTitle: "markdown富文本",
      validate: true,
    },
    {
      blockId: 40,
      blockTitle: "其它",
      validate: true,
    },
  ],
};