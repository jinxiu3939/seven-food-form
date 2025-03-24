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
    label: '时间',
    name: 'textdiff-1',
    value: {'op': '>=', text: 90},
    block: 1,
    kind: "datetime-local",
  }).textDiff(),
  new TextDiffModelFactory({
    label: '浏览量',
    max: 5,
    name: 'textdiff-2',
    kind: "number",
    help: "hahahhhhh",
    value: '',
    disabled: false,
    view: false,
    block: 1,
    tooltip: true,
    operations: OperationList2,
  }).instance(),
  {
    "clear": false,
    "disabled": false,
    kind: "date",
    "placeholder": "请输入订单总数",
    "readonly": false,
    "value": {op: "-", text: "60-100"},
    "label": "日期",
    "name": "textdiff-1",
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
