import {
  QuickFormFactory,
  CustomModelFactory,
} from '../modules/dynamic-form';

import { MapConfigComponent } from '../pages/map.component';

export const customModels: any = [
  new QuickFormFactory({
    label: '时间设置',
    name: 'yes_no1',
    value: [],
    require: false,
    renderComponent: null,
    onComponentInitFunction: function (e) {
      console.log(e);
    }
  }).custom(),
  new CustomModelFactory({
    label: '自定义设置',
    name: 'zupu-1',
    value: ['A', 1, 'gege'],
    renderComponent: MapConfigComponent
  }).instance(),
  {
    disabled: false,
    help: "网络配置",
    label: "配置",
    max: "0",
    min: "0",
    name: "setting",
    order: 0,
    payload: {method: 'custom'},
    readonly: false,
    type: "custom",
    value: ""
  }
];
