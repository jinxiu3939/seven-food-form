import {
  QuickFormFactory,
  CheckboxTreeModelFactory,
} from '../modules/dynamic-form';

import { checkboxTree } from './mock-checkbox-tree-data';

export const checkboxTreeModels: any = [
  new QuickFormFactory({
    label: '地区',
    name: 'chk-tree-1',
    value: null,
    tree: checkboxTree,
    require: true,
    readonly: true,
  }).checkboxTree(),
  new CheckboxTreeModelFactory({
    label: '族谱',
    name: 'chk-tree-zupu',
    clear: true,
    tree: checkboxTree,
    value: ['A', 1, 'gege'],
    disabled: true,
  }).instance(),
  {
    type: 'checkbox-tree',
    tree: checkboxTree,
    name: 'chk-tree-area',
    label: '地区',
    width: 5,
    max: 4,
    min: 2,
    value: '32'
  },
];
