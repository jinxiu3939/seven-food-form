import {
  QuickFormFactory,
  SpreadsheetModelFactory,
} from '../modules/dynamic-form';

export const SpreadsheetModels: any = [
  new QuickFormFactory({
    label: '文件',
    name: 'spreadsheet-1',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1783I6aYyiOnL23yB2YJpZfODV3PTosYelfppTHaGh+MB9MQA87u',
      url: '/api/upload/spreadsheet',
    },
    require: true,
    header: ["标题", "类型"],
  }).spreadsheet(),
  new SpreadsheetModelFactory({
    label: '题库',
    max: 5,
    multiple: true,
    name: 'spreadsheet-2',
    uploadConfig: {
      authTokenHeader: 'Token',
      authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
      queueLimit: 3,
      url: '/api/upload/spreadsheet',
    },
    value: '',
    view: false,
  }).instance(),
  {
    label: '导入',
    name: 'spreadsheet-3',
    type: 'spreadsheet',
    value: '',
    help: 'this is a spreadsheet',
    order: 1,
    validator: '',
    header: ['标题','类型','数量','用户'],
  },
];
