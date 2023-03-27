import {
  QuickFormFactory,
  DropDownBoxModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';

export const dropDownModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'yes_no1',
    value: null,
    options: options,
    require: true,
  }).dropDownBox(),
  new DropDownBoxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    options: options,
    value: 'gege',
  }).instance(),
  {
    type: 'drop-down-box',
    label: '动物',
    options: options,
    name: 'animal-1',
    width: 5,
    max: 4,
  },
];
