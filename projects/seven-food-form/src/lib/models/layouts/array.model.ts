import { SfFormModel } from '../form.model';

export type SfArrayLayoutType = 'list' | 'cards';

export interface SfArrayOption {
  name: string;
  title?: string;
  arrayLayout?: SfArrayLayoutType;
  minItems?: number;
  maxItems?: number;
  models: SfFormModel[];
}

export class SfArrayModel implements SfFormModel {
  type: string = 'array';
  name: string;
  title?: string;
  arrayLayout: SfArrayLayoutType;
  minItems?: number;
  maxItems?: number;
  models: SfFormModel[];

  constructor(option: SfArrayOption) {
    this.name = option.name;
    this.title = option.title;
    this.arrayLayout = option.arrayLayout || 'list';
    this.minItems = option.minItems;
    this.maxItems = option.maxItems;
    this.models = option.models;
  }
}
