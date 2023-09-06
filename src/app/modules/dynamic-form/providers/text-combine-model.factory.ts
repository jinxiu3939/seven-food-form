import { ModelType, TextCombineModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 组合文本框模型工厂
 */
export class TextCombineModelFactory extends BaseModelFactory {
  protected model: TextCombineModel;

  protected type: ModelType = 'text-combine';

  constructor(obj: any) {
    super(obj);
    this.config.kind = 'text'; // 文本框类型
    this.config.readonly = false; // 默认非只读
    this.config.value = {}; // 默认值
  }

  format() {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = {};
    }
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
