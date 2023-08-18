import {
  QuickFormFactory,
  FileModelFactory,
} from '../modules/dynamic-form';

export const FileModels: any = [
  new QuickFormFactory({
    label: 'PDF',
    name: 'pdf-1',
    value: null,
    require: true,
    kind: 'pdf',
  }).file(),
  new FileModelFactory({
    label: 'doc',
    name: 'doc-1',
    clear: true,
    value: 'gege',
    accept: 'application/msword',
  }).instance(),
  {
    type: 'file',
    label: 'zip',
    name: 'zip-1',
    download: 'http://www.shaimobao.com',
    disabled: true,
  },
];
