import {
  QuickFormFactory,
  DateRangePickerModelFactory,
} from '../modules/dynamic-form';

export const dateRangePickerModels: any = [
  new QuickFormFactory({
    label: '截止时间',
    name: 'daterange-deadline-1',
    value: null,
    require: true,
    now: true,
  }).dateRangePicker(),
  new DateRangePickerModelFactory({
    label: '开始时间',
    name: 'daterange-start-1',
    clear: true,
    value: {start: '33ER2023-03-01', end: '3009-09-10'},
    disabled: true,
  }).instance(),
  {
    type: 'date-range-picker',
    label: '发布时间',
    name: 'daterange-publish-1',
    width: 5,
    value: '32',
    format: 'YYYY-MM',
  },
];
