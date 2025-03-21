import {
  QuickFormFactory,
  TextRangeModelFactory,
} from '../modules/dynamic-form';

const OperationList1 = [
    { text: '>', value: '>' },
    { text: '>=', value: '>=' },
    { text: '<', value: '<' },
    { text: '<=', value: '<=' },
    { text: '!=', value: '!=' },
];

const OperationList2 = [
    { text: '>', value: '>' },
    { text: '>=', value: '>=' },
];

export const TextrangeModels: any = [
  new QuickFormFactory({
    label: '分数',
    name: 'score-1',
    value: {'op': '>=', text: 90},
    block: 1,
  }).textRange(),
  new TextRangeModelFactory({
    label: '浏览量',
    max: 5,
    name: 'views-2',
    help: "hahahhhhh",
    value: '',
    disabled: false,
    view: false,
    block: 1,
    tooltip: true,
  }).instance(),
  {
    "clear": false,
    "disabled": false,
    "kind": "text",
    "placeholder": "请输入订单总数",
    "readonly": false,
    "value": {op: "", text: ""},
    "label": "名称",
    "name": "orders",
    "type": "text-range",
    "help": "订单总数",
    "max": 100,
    "min": 0,
    "order": 0,
    "require": true,
    "validator": "",
    "data": "textBox",
    block: 5,
    operations: OperationList1,
    position: 'right',
    tooltip: true,
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
    "require": true,
    "type": "text-range",
    "validator": "",
    "value": "",
    block: 5,
    position: 'left',
  },
  new QuickFormFactory({
    label: '时间',
    name: 'time-1',
    clear: true,
    value: {text: '12:34', 'op': '>'},
    disabled: false,
    operations: OperationList2,
  }).textRange(),
  new QuickFormFactory({
    label: '本地时间',
    name: 'local-time-1',
    clear: true,
    value: {text: '2022-11-12 11:12', op: '<'},
    position: 'right'
  }).textRange(),
];
