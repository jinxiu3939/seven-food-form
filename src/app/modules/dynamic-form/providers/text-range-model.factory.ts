import { ModelType, TextRangeModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 范围文本框模型工厂
 */
export class TextRangeModelFactory extends BaseModelFactory {
  protected model: TextRangeModel;

  protected type: ModelType = 'text-range';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用，若禁用表单组件自动设置为disabled
    this.config.kind = 'text'; // 文本框类型
    this.config.value = {start: '', end: ''}; // 默认值
  }

  format() {
    /* 值为对象 */
    if (! this.model.value) {
      this.model.value = {start: '', end: ''};
    }
  }
}
