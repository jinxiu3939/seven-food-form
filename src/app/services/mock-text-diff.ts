import {
  QuickFormFactory,
  TextDiffModelFactory,
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

export const TextdiffModels: any = [
  new QuickFormFactory({
    label: '分数',
    name: 'score-1',
    value: {'op': '>=', text: 90},
    block: 1,
  }).textDiff(),
  new TextDiffModelFactory({
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
    "value": {op: "-", text: "60-100"},
    "label": "名称",
    "name": "orders",
    "type": "text-diff",
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
];
