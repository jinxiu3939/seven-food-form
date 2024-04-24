import {
  QuickFormFactory,
  RadioModelFactory,
  BooleanRadioModelFactory,
} from '../modules/dynamic-form';

import { options } from './mock-options';

export const radioModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'yes_no1',
    all: true,
    options: options,
    require: true,
    value: 'K',
    readonly: true,
  }).radio(),
  new RadioModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    options: options,
    value: 'gege',
    empty: true,
  }).instance(),
  {
    type: 'radio',
    label: '动物',
    disabled: true,
    options: options,
    name: 'animal-1',
    width: 5,
    max: 4,
  },
  new BooleanRadioModelFactory({
    label: '是否',
    name: 'yes-or-no',
    value: false,
    all: true
  }).instance(),
];
