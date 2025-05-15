import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 英文单词文本框模型工厂
 */
export class EnglishWordTextBoxModelFactory extends TextBoxModelFactory {
  format() {
    this.model.validator = 'englishWord'; // 验证器
  }
}
