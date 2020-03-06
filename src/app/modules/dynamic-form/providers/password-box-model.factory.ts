import { ModelType, PasswordBoxModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 密码框模型工厂
 */
export class PasswordBoxModelFactory extends BaseModelFactory {
  protected model: PasswordBoxModel;
  protected type: ModelType = 'password-box';

  constructor(obj: any) {
    super(obj);
    this.config.empty = false; // 默认不清空
    this.config.visible = false; // 默认密码不可见
    this.config.validator = 'inputEqual'; // 密码验证规则
    this.config.value = '';
  }

  format() {
    if (this.model.value) {
      this.model.value = this.model.value + '';
    }
  }
}
