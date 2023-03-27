import {
  QuickFormFactory,
  KeywordModelFactory,
} from '../modules/dynamic-form';

export const keywordModels: any = [
  new QuickFormFactory({
    label: '标签',
    name: 'tag',
    value: ['三国', '武当'],
    options: ['汉', '三维', '射雕', '魅惑', '汉', '三维', '射雕', '魅惑', '汉', '三维', '射雕', '魅惑'],
    block: 1,
  }).keyword(),
  new KeywordModelFactory({
    label: '族谱',
    name: 'zupu-1',
    clear: true,
    value: 'gege',
  }).instance(),
  {
    type: 'keyword',
    label: '动物',
    name: 'animal-1',
    value: ['母老虎'],
    readonly: true,
    width: 5,
    max: 4,
  },
];
