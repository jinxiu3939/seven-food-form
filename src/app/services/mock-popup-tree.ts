import {
  QuickFormFactory,
  PopupTreeModelFactory,
} from '../modules/dynamic-form';

import { treeData } from "./mock-tree-data";
import { searchConfig } from './mock-popup-radio';

export const PopupTreeModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'popuptree-yes_no1',
    value: [],
    tree: treeData,
    require: true,
    size: 'small',
  }).popupTree(),
  new PopupTreeModelFactory({
    label: '族谱',
    name: 'popuptree-zupu-1',
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
    name: "popuptree-cat_id",
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
  {
    clear: false,
    disabled: false,
    help: "驼峰命名法，模型表单的值必须和数据模型类名称相同",
    kind: "text",
    label: "表单名称",
    max: "0",
    min: "0",
    name: "popuptree-form_name",
    order: 0,
    payload: {method: 'englishWordTextBox'},
    placeholder: "",
    readonly: false,
    require: true,
    type: "text-box",
    validator: "englishWord",
    value: "",
  }
];
