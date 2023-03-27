import {
  QuickFormFactory,
  DateRangePickerModelFactory,
} from '../modules/dynamic-form';

export const dateRangePickerModels: any = [
  new QuickFormFactory({
    label: '截止时间',
    name: 'deadline-1',
    value: null,
    require: true,
    now: true,
  }).dateRangePicker(),
  new DateRangePickerModelFactory({
    label: '开始时间',
    name: 'start-1',
    clear: true,
    value: {start: '33ER2023-03-01', end: '3009-09-10'},
    readonly: true,
  }).instance(),
  {
    type: 'date-range-picker',
    label: '发布时间',
    name: 'publish-1',
    width: 5,
    value: '32',
    format: 'YYYY-MM',
  },
];
