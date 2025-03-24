import {
  QuickFormFactory,
  TextRangeModelFactory,
} from '../modules/dynamic-form';

export const TextrangeModels: any = [
  new QuickFormFactory({
    label: '分数',
    name: 'textrange-score-1',
    value: {start: 60, end: 90},
    block: 1,
  }).textRange(),
  new TextRangeModelFactory({
    label: '浏览量',
    max: 5,
    name: 'textrange-views-2',
    help: "hahahhhhh",
    value: '',
    disabled: false,
    block: 1,
  }).instance(),
  {
    "clear": false,
    "disabled": false,
    "kind": "number",
    "placeholder": "请输入最小订单数-请输入最大订单数",
    "readonly": false,
    "value": {start: "", end: 3000},
    "label": "名称",
    "name": "textrange-orders",
    "type": "text-range",
    "help": "订单总数",
    "max": 100,
    "min": 0,
    "order": 0,
    "require": true,
    "validator": "",
    "data": "textBox",
    block: 5,
  },
];
