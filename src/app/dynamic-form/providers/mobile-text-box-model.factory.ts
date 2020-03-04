import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 中国大陆手机号码文本框模型工厂
 */
export class MobileTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.validator = 'mobile'; // 验证规则
    this.config.max = 11; // 最大位数
  }
}
