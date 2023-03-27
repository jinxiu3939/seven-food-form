import {
  QuickFormFactory,
  CheckboxModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';

export const checkboxModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'yes_no1',
    value: null,
    options: options,
    require: true,
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
    options: options,
    name: 'animal-1',
    width: 5,
    max: 4,
  },
];
