import {
  QuickFormFactory,
  CheckboxModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';

export const checkboxModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'vegetable-1',
    value: null,
    options: options,
    require: true,
    drag: true,
    all: true
  }).checkbox(),
  new CheckboxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    options: options,
    value: ['A', 1, 'gege'],
    disabled: true,
  }).instance(),
  {
    type: 'checkbox',
    options: [
      { text: '选项king', value: 'M', title : '选项M', items: '99+' },
      { text: '选项N', value: 'N', title : '选项N' },
      { text: '选项ki', value: 'getOptions', title : '选项R' },
      { text: '选项1', value: 1, title : '选项1', items: '99+' },
      { text: '选项2', value: 2, title : '选项2' },
      { text: '选项3', value: 3, title : '选项3' },
    ],
    name: 'animal-1',
    width: 5,
    max: 4,
    readonly: false,
    value: 'A',
    all: true
  },
  new QuickFormFactory({
    label: '拖动',
    name: 'vegetable-2',
    value: null,
    options: [
      { text: '选项king', value: 'M', title : '选项M', items: '99+' },
      { text: '选项N', value: 'N', title : '选项N' },
      { text: '选项ki', value: 'getOptions', title : '选项R' },
      { text: '选项1', value: 1, title : '选项1', items: '99+' },
      { text: '选项2', value: 2, title : '选项2' },
      { text: '选项3', value: 3, title : '选项3' },
    ],
    require: true,
  }).checkbox(),
];
