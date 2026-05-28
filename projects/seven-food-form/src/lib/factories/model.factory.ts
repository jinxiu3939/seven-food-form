import {
  SfGroupModel,
  SfGroupOption
} from '../models/layouts/group.model';
import {
  SfArrayModel,
  SfArrayOption
} from '../models/layouts/array.model';
import {
  SfTextBoxModel,
  SfTextBoxOption
} from '../models/controls/text-box.model';
import {
  SfTextAreaModel,
  SfTextAreaOption
} from '../models/controls/text-area.model';

import { SfControlType } from '../models/control-type.enum';
import { ValidatorFn } from '@angular/forms';
import { SfControlModel, SfFormModel } from '../../public-api';

export interface SfModelConfig {
  type: 'group' | 'array' | 'text' | 'textarea' | 'select' | 'number' | 'email' | 'password' | 'image';
  name: string;
  title?: string;
  label?: string;
  layout?: 'vertical' | 'tab' | '';
  arrayLayout?: 'list' | 'cards';
  models?: SfModelConfig[];
  children?: SfModelConfig[];
  options?: any[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  hint?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  fieldSize?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape?: 'rectangle' | 'semi-round' | 'round';
  multiple?: boolean;
  minItems?: number;
  maxItems?: number;
  validators?: ValidatorFn[];
  errorMessages?: { [key: string]: string };
  columns?: number;
  accept?: string;
  maxSize?: number;
  imageUrl?: string;
  width?: number;
  height?: number;
}

export class SfModelFactory {
  private static instance: SfModelFactory;

  private constructor() {}

  static getInstance(): SfModelFactory {
    if (!SfModelFactory.instance) {
      SfModelFactory.instance = new SfModelFactory();
    }
    return SfModelFactory.instance;
  }

  createModel(config: SfModelConfig): SfGroupModel | SfArrayModel | SfControlModel {
    switch (config.type) {
      case 'group':
        return this.createGroupModel(config);
      case 'array':
        return this.createArrayModel(config);
      case 'text':
      case 'number':
      case 'email':
      case 'password':
        return this.createTextBoxModel(config);
      case 'textarea':
        return this.createTextAreaModel(config);
      default:
        throw new Error(`Unknown model type: ${config.type}`);
    }
  }

  createModels(configs: SfModelConfig[]): SfFormModel[] {
    return configs.map(config => this.createModel(config));
  }

  private createGroupModel(config: SfModelConfig): SfGroupModel {
    const children = config.models || config.children || [];

    const option: SfGroupOption = {
      name: config.name,
      title: config.title,
      layout: config.layout || '',
      models: this.createModels(children)
    };

    return new SfGroupModel(option);
  }

  private createArrayModel(config: SfModelConfig): SfArrayModel {
    const children = config.models || config.children || [];

    const option: SfArrayOption = {
      name: config.name,
      title: config.title,
      arrayLayout: config.arrayLayout || 'list',
      minItems: config.minItems,
      maxItems: config.maxItems,
      models: this.createModels(children)
    };

    return new SfArrayModel(option);
  }

  private createTextBoxModel(config: SfModelConfig): SfTextBoxModel {
    let controlType: SfControlType;

    switch (config.type) {
      case 'number':
        controlType = SfControlType.NUMBER;
        break;
      case 'email':
        controlType = SfControlType.EMAIL;
        break;
      case 'password':
        controlType = SfControlType.PASSWORD;
        break;
      default:
        controlType = SfControlType.TEXT;
    }

    const option: SfTextBoxOption = {
      name: config.name,
      label: config.label,
      required: config.required,
      validators: config.validators,
      disabled: config.disabled,
      defaultValue: config.defaultValue,
      hint: config.hint,
      errorMessages: config.errorMessages,
      controlType: controlType,
      placeholder: config.placeholder,
      fieldSize: config.fieldSize,
      shape: config.shape,
      maxLength: config.maxLength,
      minLength: config.minLength,
      pattern: config.pattern
    };

    return new SfTextBoxModel(option);
  }

  private createTextAreaModel(config: SfModelConfig): SfTextAreaModel {
    const option: SfTextAreaOption = {
      name: config.name,
      label: config.label,
      required: config.required,
      validators: config.validators,
      disabled: config.disabled,
      defaultValue: config.defaultValue,
      hint: config.hint,
      errorMessages: config.errorMessages,
      placeholder: config.placeholder,
      rows: config.rows,
      maxLength: config.maxLength,
      fieldSize: config.fieldSize,
      shape: config.shape
    };

    return new SfTextAreaModel(option);
  }

  // Convenience methods
  text(name: string, label?: string, options?: Partial<SfModelConfig>): SfTextBoxModel {
    return this.createTextBoxModel({
      type: 'text',
      name,
      label,
      ...options
    });
  }

  number(name: string, label?: string, options?: Partial<SfModelConfig>): SfTextBoxModel {
    return this.createTextBoxModel({
      type: 'number',
      name,
      label,
      ...options
    });
  }

  email(name: string, label?: string, options?: Partial<SfModelConfig>): SfTextBoxModel {
    return this.createTextBoxModel({
      type: 'email',
      name,
      label,
      ...options
    });
  }

  password(name: string, label?: string, options?: Partial<SfModelConfig>): SfTextBoxModel {
    return this.createTextBoxModel({
      type: 'password',
      name,
      label,
      ...options
    });
  }

  textarea(name: string, label?: string, options?: Partial<SfModelConfig>): SfTextAreaModel {
    return this.createTextAreaModel({
      type: 'textarea',
      name,
      label,
      ...options
    });
  }

  group(name: string, models: SfModelConfig[], options?: Partial<SfModelConfig>): SfGroupModel {
    return this.createGroupModel({
      type: 'group',
      name,
      models,
      ...options
    });
  }

  array(name: string, models: SfModelConfig[], options?: Partial<SfModelConfig>): SfArrayModel {
    return this.createArrayModel({
      type: 'array',
      name,
      models,
      ...options
    });
  }

  groupWithModels(name: string, models: SfFormModel[], options?: Partial<SfModelConfig>): SfGroupModel {
    const option: SfGroupOption = {
      name,
      title: options?.title,
      layout: options?.layout || '',
      models: models
    };

    return new SfGroupModel(option);
  }
}

export const sfModelFactory = SfModelFactory.getInstance();
