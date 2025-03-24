import {
  QuickFormFactory,
  ClockModelFactory,
} from '../modules/dynamic-form';

export const clockModels: any = [
  new QuickFormFactory({
    label: '截止时间',
    name: 'clock-1',
    value: null,
    require: true,
    // now: true,
  }).clock(),
  new ClockModelFactory({
    label: '开始时间',
    name: 'clock-start-1',
    kind: '12',
    value: {h: '23', i: '59'},
  }).instance(),
  {
    type: 'clock',
    label: '结束时间',
    name: 'clock-end-1',
    width: 5,
    value: '',
    readonly: true,
    kind: '12',
  },
];
