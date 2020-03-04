import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 英文单词文本框模型工厂
 */
export class EnglishWordTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.validator = 'englishWord'; // 验证规则
  }
}
