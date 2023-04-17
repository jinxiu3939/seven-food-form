import {
  QuickFormFactory,
  ItemListModelFactory,
} from '../modules/dynamic-form';

export const itemListModels: any = [
  new QuickFormFactory({
    label: '颜色',
    name: 'place-1',
    value: null,
    attributes: [
      {text: '名称种颜色一种颜色一种颜色一种颜色', type: 'input', value: 'name'},
      {text: '数量', type: 'number', value: 'number'},
      {text: '类型', type: 'drop-down', value: 'type', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
      {text: '分类', type: 'drop-down-filter', value: 'taxonomy', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
      {text: '禁用', type: 'boolean-radio', value: 'disabled'},
      {text: '描述', type: 'textarea', value: 'description'},
    ],
    size: '',
    block: 1,
    max: 4,
  }).itemList(),
  new ItemListModelFactory({
    label: '条款',
    name: 'doc-1',
    clear: true,
    value: [{key: 'kind', value: 'gege'}, {key: 'category', value: 'apple'}],
    accept: 'application/msword',
    kind: 'key-value',
    attributes: [
      {text: '键', type: 'input', value: 'key'},
      {text: '值', type: 'textarea', value: 'value'},
    ],
    keyValue: [
      {key: 'kind', type: 'input'},
      {key: 'number', type: 'number'},
      {key: 'category', type: 'drop-down', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
      {key: 'type', type: 'drop-down-filter', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
    ]
  }).instance(),
  {
    type: 'item-list',
    label: '项目',
    name: 'item-1',
    download: 'http://www.shaimobao.com',
    disabled: false,
    attributes: [
      {text: '键', type: 'input', value: 'key'},
      {text: '值', type: 'textarea', value: 'value'},
    ],
    value: [],
    size: 'large',
    min: 2,
  },
];
