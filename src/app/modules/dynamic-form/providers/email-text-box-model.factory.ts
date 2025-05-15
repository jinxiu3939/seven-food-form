import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 邮箱文本框模型工厂
 */
export class EmailTextBoxModelFactory extends TextBoxModelFactory {
  format() {
    this.model.kind = 'email'; // 文本框类型
    this.model.validator = 'email'; // 验证器
  }
}
