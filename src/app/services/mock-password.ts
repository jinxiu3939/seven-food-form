import {
  QuickFormFactory,
  PasswordBoxModelFactory,
} from '../modules/dynamic-form';

export const PasswordModels: any = [
  new QuickFormFactory({
    label: '验证码',
    name: 'pwd-capture-1',
    require: true,
    kind: 'pdf',
    visible: true,
    value: '9we7987',
  }).passwordBox(),
  new PasswordBoxModelFactory({
    label: '密码',
    name: 'pwd-password-1',
    clear: true,
    value: '443',
    empty: true,
    max: 10,
  }).instance(),
  {
    type: 'password-box',
    label: 'zip',
    name: 'pwd-password-2',
    visible: true,
    sureValue: '',
    value: '',
    min: 2,
    validator: 'inputEqual',
  },
];
