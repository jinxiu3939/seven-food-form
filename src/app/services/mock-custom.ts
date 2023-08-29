import {
  QuickFormFactory,
  CustomModelFactory,
} from '../modules/dynamic-form';

import { MapConfigComponent } from '../pages/map.component';

export const CustomModels: any = [
  new QuickFormFactory({
    label: '时间设置',
    name: 'yes_no1',
    value: [],
    require: true,
    renderComponent: MapConfigComponent,
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
    require: true,
    type: "custom",
    value: "",
    renderComponent: MapConfigComponent
  }
];
