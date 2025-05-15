import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 中国大陆手机号码文本框模型工厂
 */
export class MobileTextBoxModelFactory extends TextBoxModelFactory {
  format() {
    this.model.max = 11; // 最大位数
    this.model.validator = 'mobile'; // 验证器
  }
}
