import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 域文本框模型工厂
 */
export class RangeTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'range'; // 文本框类型
  }

  format() {
    if (! this.model.min) {
      this.model.min = 0;
    }
    if (! this.model.max) {
      this.model.max = 100;
    }
  }
}
