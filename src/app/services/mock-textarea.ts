import {
  QuickFormFactory,
  TextAreaModelFactory,
} from '../modules/dynamic-form';

export const TextareaModels: any = [
  new QuickFormFactory({
    label: '简介',
    name: 'textarea-1',
  }).textArea(),
  new TextAreaModelFactory({
    label: '题库',
    max: 5,
    multiple: true,
    name: 'textarea-2',
    value: '<p>卡尼哪里啦</p>就是',
    view: false,
    disabled: true,
  }).instance(),
  {
    "disabled": false,
    "rows": 30,
    "label": "备注",
    "name": "textarea-description",
    "type": "text-area",
    "value": "",
    "help": "",
    "max": 0,
    "min": 0,
    "order": 0,
    "require": false,
    "validator": "",
    "data": "textArea",
    block: 1,
  },
];
