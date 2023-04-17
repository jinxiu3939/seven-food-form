import {
  QuickFormFactory,
  PopupTreeModelFactory,
} from '../modules/dynamic-form';

import { treeData } from "./mock-tree-data";
import { searchConfig } from './mock-popup-radio';

export const PopupTreeModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'yes_no1',
    value: [],
    tree: treeData,
    require: true,
    size: 'small',
  }).popupTree(),
  new PopupTreeModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    tree: [],
    value: ['A', 1, 'gege'],
    // disabled: true,
    size: 'medium',
    searchConfig: searchConfig,
    filter: true,
  }).instance(),
  {
    disabled: false,
    mode: "sync",
    text: "地理",
    tree: treeData,
    value: "geographies",
    label: "类别",
    name: "cat_id",
    type: "popup-tree",
    help: "关联类别",
    max: 0,
    min: 0,
    order: 0,
    require: true,
    validator: "",
    data: "popupTree",
    readonly: false,
    size: 'tiny',
    filter: true,
    block: 3,
  },
];
