import {
  QuickFormFactory,
  ItemListModelFactory,
} from '../modules/dynamic-form';

export const itemListModels: any = [
  new QuickFormFactory({
    label: '颜色',
    name: 'itemlist-1',
    value: null,
    attributes: [
      {text: '名称种颜色一种颜色一种颜色一种颜色', type: 'input', value: 'name'},
      {text: '数量', type: 'number', value: 'number'},
      {text: '类型', type: 'drop-down-filter', value: 'type', options: [
        { text: '恐龙', value: 'dinosaur', title : '一种动物' },
        { text: '蜥蜴', value: 'lizard', title : '一种爬行动物' },
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
    name: 'itemlist-doc-1',
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
    name: 'itemlist-item-1',
    download: 'http://www.shaimobao.com',
    disabled: false,
    attributes: [
      {text: '键', type: 'input', value: 'key'},
      {text: '值', type: 'textarea', value: 'value'},
      {text: '有效期', type: 'date', value: 'deadline'},
      {text: '开始时间', type: 'datetime', value: 'start'},
    ],
    value: [],
    size: 'large',
    min: 2,
    height: 'large',
  },
  new QuickFormFactory({
    label: '键值对',
    name: 'itemlist-setting-1',
    value: [{key: 'kind', value: 'gege'}, {key: 'category', value: 'apple'}],
    attributes: [
      {text: '键', type: 'input', value: 'key'},
      {text: '值', type: 'textarea', value: 'value'},
    ],
    keyValue: [
      {key: 'kind', type: 'input'},
      {key: 'number', type: 'number'},
      {key: 'category', type: 'drop-down-filter', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
      {key: 'type', type: 'drop-down-filter', options: [
        { text: '苹果', value: 'apple', title : '一种水果' },
        { text: '梨', value: 'pear', title : '一种水果' },
      ]},
      {key: 'deadline', type: 'date'},
      {key: 'starttime', type: 'datetime'},
    ]
  }).keyValue(),
];
