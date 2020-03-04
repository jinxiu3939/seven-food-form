import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 邮箱文本框模型工厂
 */
export class EmailTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'email'; // 文本框类型
    this.config.validator = 'email'; // 验证器
  }
}
