import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 加密文本框模型工厂
 */
export class PasswordTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'password'; // 文本框类型
  }
}
