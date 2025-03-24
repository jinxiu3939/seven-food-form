import {
  QuickFormFactory,
  DropDownBoxModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';

export const dropDownModels: any = [
  new QuickFormFactory({
    label: '选择题',
    name: 'dropdown-1',
    value: null,
    options: options,
    require: true,
  }).dropDownBox(),
  new DropDownBoxModelFactory({
    label: '单选题',
    name: 'dropdown-2',
    clear: true,
    options: options,
    disabled: true,
    require: true,
  }).instance(),
  {
    type: 'drop-down-box',
    label: '选择',
    options: options,
    name: 'dropdown-3',
    readonly: true,
    require: true,
  },
];
