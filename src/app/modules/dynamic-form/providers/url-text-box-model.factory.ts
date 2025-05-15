import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 网址文本框模型工厂
 */
export class UrlTextBoxModelFactory extends TextBoxModelFactory
{
  format() {
    this.model.kind = 'url'; // 文本框类型
    this.model.validator = 'url'; // 验证器
  }
}
