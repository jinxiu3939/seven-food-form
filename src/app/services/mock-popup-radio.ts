import {
  QuickFormFactory,
  PopupRadioModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';
import { token, appKey } from './mock-one';

export const searchConfig = {
  conditions: [
    {
      text: '模型',
      type: 'drop-down-filter',
      value: 'system_model_id',
      options: [
        { text: 'article', value: 99, title : 'article', items: null },
        { text: 'newsArticle', value: 9, title : 'newsArticle', items: null },
        { text: '视频', value: 92, title : 'video', items: null },
      ],
      mode: 'async',
      endpoint: '/api/index/index/index',
      param: 'model_name'
    },
    {
      text: '是否隐藏',
      type: 'boolean-radio',
      value: 'form_id',
    },
    {
      text: '排序',
      type: 'number',
      value: 'sort',
    },
    {
      text: '标识',
      type: 'input',
      value: 'name',
    },
    {
      text: '类型',
      type: 'drop-down',
      value: 'type',
      options: [
        { text: '分类', value: 99, title : 'taxonomy'},
        { text: '板块', value: 9, items: null },
      ],
    },
    {
      text: '开始时间',
      type: 'datetime',
      value: 'starttime',
    },
    {
      text: '结束日期',
      type: 'date',
      value: 'deadline',
    },
  ],
  additionalParameter: {
    format: "option",
    system_model_id: 1
  },
  endpoint: '/api/index/test/index',
  mode: 'async',
  result: [],
  size: 30,
  headers: {
    'Token': token,
    'App-Key': appKey,
  },
};

export const PopupRadioModels: any = [
  new QuickFormFactory({
    label: '关联字段',
    name: 'popupradio-field_id',
    options: [
      { text: '文章', value: 99, title : 'articleOptions'},
      { text: '新闻', value: 9, items: null },
      { value: 92, title : 'video', items: null },
    ],
    searchConfig: searchConfig,
    value: '',
    text: '',
    block: 1,
  }).popupRadio(),
  new PopupRadioModelFactory({
    label: '族谱',
    name: 'popupradio-zupu-1',
    clear: true,
    options: options,
    value: ['A', 1, 'gege'],
    searchConfig: {
      conditions: [
        {
          text: '关键字',
          type: 'input',
          value: 'keyword',
        },
      ],
    },
    disabled: false,
  }).instance(),
  {
    type: 'popup-radio',
    options: options,
    name: 'popupradio-animal-1',
    label: '动物',
    value: 'cattle',
    text: '牛',
  },
];
