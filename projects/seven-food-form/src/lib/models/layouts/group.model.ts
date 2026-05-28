import { SfFormModel } from '../form.model';

export type SfLayoutType = 'vertical' | 'tab' | '';

export interface SfGroupOption {
  name: string;
  title?: string;
  layout?: SfLayoutType;
  models: SfFormModel[];
}

export class SfGroupModel implements SfFormModel {
  type: string = 'group';
  name: string;
  title?: string;
  layout: SfLayoutType;
  models: SfFormModel[];

  constructor(option: SfGroupOption) {
    this.name = option.name;
    this.title = option.title;
    this.layout = option.layout || '';
    this.models = option.models;
  }
}
