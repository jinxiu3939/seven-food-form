import {
  QuickFormFactory,
  LinkageBoxModelFactory,
} from '../modules/dynamic-form';

import { tree } from './mock-linkage-tree-data';

export const linkageModels: any = [
    new QuickFormFactory({
    label: '族谱',
    name: 'zupu-2',
    tree: tree,
    root: 10,
  }).linkageBox(),
  new LinkageBoxModelFactory({
    label: '族谱',
    name: 'zupu-1',
    value: 'gege',
  }).instance(),
  {
    label: '族谱',
    name: 'zupu-3',
    type: 'linkage-box',
    value: ['111'],
    help: 'this is a password',
    order: 1,
    tree: tree,
    root: 0,
  },
];
