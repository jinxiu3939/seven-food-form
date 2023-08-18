import { ModelType, TextAreaModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 文本域模型工厂
 */
export class TextAreaModelFactory extends BaseModelFactory {
  protected model: TextAreaModel;

  protected type: ModelType = 'text-area';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用，若禁用表单组件自动设置为disabled
    this.config.rows = 3;
  }
}
