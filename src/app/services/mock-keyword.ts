import {
  QuickFormFactory,
  KeywordModelFactory,
} from '../modules/dynamic-form';

export const keywordModels: any = [
  new QuickFormFactory({
    label: '标签',
    name: 'keyword-tag',
    value: ['三国2', '武当', '三维', '射雕', '魅惑', '汉'],
    options: ['汉', '三维', '射雕22', '魅惑', '汉3', '三维2', '射雕3', '魅惑2', '汉3', '三维1', '射雕2', '魅惑2', 'tie', 'hello world', 'I`m', 'ala', 'kilo', 'Where Is php'],
    block: 1,
    drag: true,
  }).keyword(),
  new KeywordModelFactory({
    label: '族谱',
    name: 'keyword-zupu-1',
    // disabled: true,
    value: 'gege',
    min: 2,
    drag: true,
  }).instance(),
  {
    type: 'keyword',
    label: '动物',
    name: 'keyword-animal-1',
    value: ['母老虎', 'han', 'getOptions', 'hello-world'],
    // readonly: true,
    width: 5,
    max: 4,
  },
];
