import { SfControlModel, SfControlOption } from './control.model';
import { SfControlType } from '../control-type.enum';

export interface SfTextBoxOption extends SfControlOption {
  controlType?: SfControlType;
  placeholder?: string;
  fieldSize?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape?: 'rectangle' | 'semi-round' | 'round';
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export class SfTextBoxModel extends SfControlModel<string> {
  controlType: SfControlType;
  placeholder: string;
  fieldSize: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape: 'rectangle' | 'semi-round' | 'round';
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  constructor(option: SfTextBoxOption) {
    super(option);
    this.controlType = option.controlType || SfControlType.TEXT;
    this.placeholder = option.placeholder || '';
    this.fieldSize = option.fieldSize || 'medium';
    this.shape = option.shape || 'rectangle';
    this.maxLength = option.maxLength;
    this.minLength = option.minLength;
    this.pattern = option.pattern;
  }

  getInputType(): string {
    switch (this.controlType) {
      case SfControlType.EMAIL:
        return 'email';
      case SfControlType.PASSWORD:
        return 'password';
      case SfControlType.NUMBER:
        return 'number';
      default:
        return 'text';
    }
  }
}
