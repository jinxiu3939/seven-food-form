import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 英文名称文本框模型工厂
 */
export class LetterNameTextBoxModelFactory extends TextBoxModelFactory {
  format() {
    this.model.validator = 'letterName'; // 验证器
  }
}
