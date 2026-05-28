import { SfControlModel, SfControlOption } from './control.model';
import { SfControlType } from '../control-type.enum';

export interface SfTextAreaOption extends SfControlOption {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  fieldSize?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape?: 'rectangle' | 'semi-round' | 'round';
}

export class SfTextAreaModel extends SfControlModel<string> {
  controlType: SfControlType = SfControlType.TEXTAREA;
  placeholder: string;
  rows: number;
  maxLength?: number;
  fieldSize: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape: 'rectangle' | 'semi-round' | 'round';

  constructor(option: SfTextAreaOption) {
    super(option);
    this.placeholder = option.placeholder || '';
    this.rows = option.rows || 4;
    this.maxLength = option.maxLength;
    this.fieldSize = option.fieldSize || 'medium';
    this.shape = option.shape || 'rectangle';
  }
}
