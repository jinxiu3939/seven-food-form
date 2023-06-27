import {
  QuickFormFactory,
  PopupCheckboxModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';
import { searchConfig } from './mock-popup-radio';

export const PopupCheckboxModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'yes_no1',
    value: [],
    options: options,
    require: true,
    searchConfig: {
      conditions: [
        {
          text: '关键字',
          type: 'input',
          value: 'keyword',
        },
      ],
    },
  }).popupCheckbox(),
  new PopupCheckboxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    options: options,
    value: ['A', 1, 'gege'],
    disabled: false,
    searchConfig,
    min: 2,
  }).instance(),
  {
    type: 'popup-checkbox',
    options: options,
    name: 'animal-1',
    label: '动物',
    max: 4,
    value: ['A-1', 1, 'gege'],
    text: {'A-1': 'A', 1: 1, gege: 'gege'},
  },
];
