import {
  QuickFormFactory,
  DatePickerModelFactory,
} from '../modules/dynamic-form';

export const datePickerModels: any = [
  new QuickFormFactory({
    label: '截止时间',
    name: 'deadline-1',
    value: null,
    require: true,
    now: true,
  }).datePicker(),
  new DatePickerModelFactory({
    label: '开始时间',
    name: 'start-1',
    clear: true,
    value: '#RR532',
    disabled: true,
  }).instance(),
  {
    type: 'date-picker',
    label: '发布时间',
    name: 'publish-1',
    width: 5,
    value: '32',
    format: 'YYYY-MM',
  },
];
