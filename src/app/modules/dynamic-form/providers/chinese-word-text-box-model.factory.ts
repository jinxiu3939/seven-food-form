import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 中文文本框模型工厂
 */
export class ChineseWordTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.validator = 'chineseWord'; // 验证规则
  }
}
