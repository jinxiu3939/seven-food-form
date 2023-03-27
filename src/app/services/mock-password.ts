import {
  QuickFormFactory,
  PasswordBoxModelFactory,
} from '../modules/dynamic-form';

export const PasswordModels: any = [
  new QuickFormFactory({
    label: '验证码',
    name: 'capture-1',
    require: true,
    kind: 'pdf',
    visible: true,
  }).passwordBox(),
  new PasswordBoxModelFactory({
    label: '密码',
    name: 'password-1',
    clear: true,
    value: '443',
    empty: true,
  }).instance(),
  {
    type: 'password-box',
    label: 'zip',
    name: 'password-2',
    visible: true,
    sureValue: '',
    value: '',
  },
];
