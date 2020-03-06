import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 网址文本框模型工厂
 */
export class UrlTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'url'; // 文本框类型
    this.config.validator = 'url'; // 验证器
  }
}
