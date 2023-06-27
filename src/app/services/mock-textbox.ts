import {
  QuickFormFactory,
  TextBoxModelFactory,
} from '../modules/dynamic-form';

export const TextboxModels: any = [
  new QuickFormFactory({
    label: '文本',
    name: 'text-1',
    readonly: true,
    min: 12,
    value: '1',
  }).textBox(),
  new TextBoxModelFactory({
    label: '题库',
    max: 5,
    multiple: true,
    name: 'text-2',
    value: '',
    disabled: false,
    view: false,
  }).instance(),
  {
    "clear": false,
    "disabled": false,
    "kind": "text",
    "placeholder": "请输入你好",
    "readonly": false,
    "value": "",
    "label": "名称",
    "name": "title",
    "type": "text-box",
    "help": "产品名称",
    "max": 100,
    "min": 0,
    "order": 0,
    "require": true,
    "validator": "",
    "data": "textBox",
    block: 5,
  },
  {
    "disabled": false,
    "help": "为什么undefined",
    "label": "默认值",
    max: 0,
    min: 0,
    "name": "default",
    "order": 0,
    payload: {method: ""},
    "require": false,
    "type": "text-box",
    "validator": "",
    "value": "",
    block: 5,
  },
  new QuickFormFactory({
    label: '链接',
    name: 'url-1',
  }).urlTextBox(),
  new QuickFormFactory({
    label: '时间',
    name: 'time-1',
    clear: true,
    value: '12:34',
    disabled: false,
  }).timeTextBox(),
  new QuickFormFactory({
    label: '时间范围',
    name: 'time-range-1',
  }).rangeTextBox(),
  new QuickFormFactory({
    label: '数字',
    name: 'number-1',
  }).numberTextBox(),
  new QuickFormFactory({
    label: '手机',
    name: 'mobile-1',
  }).mobileTextBox(),
  new QuickFormFactory({
    label: '单词',
    name: 'letter-name-1',
    min: 2,
  }).letterNameTextBox(),
  new QuickFormFactory({
    label: '文件',
    name: 'file-1',
    help: '已废弃'
  }).fileTextBox(),
  new QuickFormFactory({
    label: '英文单词',
    name: 'eng-word-1',
  }).englishWordTextBox(),
  new QuickFormFactory({
    label: '邮箱',
    name: 'email-1',
    require: true,
  }).emailTextBox(),
  new QuickFormFactory({
    label: '本地时间',
    name: 'local-time-1',
    clear: true,
    value: '2022-11-12 11:12'
  }).dateTimeLocalTextBox(),
  new QuickFormFactory({
    label: '中文',
    name: 'zh-word-1',
  }).chineseWordTextBox(),
];
