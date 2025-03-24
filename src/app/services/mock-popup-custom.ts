import {
  QuickFormFactory,
  PopupCustomModelFactory,
} from '../modules/dynamic-form';

import { DateConfigComponent } from '../pages/date-config.component';

export const PopupCustomModels: any = [
  new QuickFormFactory({
    label: '蔬菜',
    name: 'popupcustom-yes_no1',
    value: [],
    require: true,
    size: 'small',
    onComponentInitFunction: function (e) {
      console.log(e);
    }
  }).popupCustom(),
  new PopupCustomModelFactory({
    label: '族谱',
    name: 'popupcustom-zupu-1',
    value: ['A', 1, 'gege'],
    // disabled: true,
    size: 'medium',
    rawData: 'endpoint',
    renderComponent: DateConfigComponent
  }).instance(),
  {
    disabled: false,
    help: "自定义配置",
    label: "配置",
    max: "0",
    min: "0",
    name: "popupcustom-setting",
    order: 0,
    payload: {method: 'popupCustom'},
    placeholder: "",
    readonly: false,
    require: true,
    type: "popup-custom",
    validator: "englishWord",
    value: "",
    text: "hello world",
    renderComponent: DateConfigComponent
  }
];
