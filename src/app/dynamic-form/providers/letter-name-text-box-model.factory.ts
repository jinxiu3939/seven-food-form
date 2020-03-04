import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 英文名称文本框模型工厂
 */
export class LetterNameTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.validator = 'letterName'; // 验证规则
  }
}
