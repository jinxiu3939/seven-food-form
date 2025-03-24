import {
  QuickFormFactory,
  TextCombineModelFactory,
} from '../modules/dynamic-form';

export const textCombineModels: any = [
  new QuickFormFactory({
    label: '颜色',
    name: 'textcombine-1',
    value: null,
    attributes: [
      {text: '名称', value: 'name'},
      {text: '数量', value: 'number'},
      {text: '禁用', value: 'disabled'},
      {text: '描述', value: 'description'},
    ],
    block: 1,
    max: 4,
  }).textCombine(),
  new TextCombineModelFactory({
    label: '条款',
    name: 'textcombine-2',
    value: {key: 1, value: 5},
    kind: 'number',
    attributes: [
      {text: '键', value: 'key'},
      {text: '值', value: 'value'},
    ]
  }).instance(),
  {
    type: 'text-combine',
    label: '项目',
    name: 'textcombine-3',
    disabled: false,
    attributes: [
      {text: '键', value: 'key'},
      {text: '值', value: 'value'},
    ],
    value: [],
    min: 2,
  },
];
