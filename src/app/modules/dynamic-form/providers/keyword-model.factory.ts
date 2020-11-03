import { ModelType, KeywordModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 关键字模型工厂
 */
export class KeywordModelFactory extends BaseModelFactory {
  protected model: KeywordModel;

  protected type: ModelType = 'keyword';

  constructor(obj: any) {
    super(obj);
    this.config.readonly = false; // 默认不只读
  }

  format() {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = [];
    }
    if (! Array.isArray(this.model.value)) {
      this.model.value = [this.model.value];
    }
  }
}
