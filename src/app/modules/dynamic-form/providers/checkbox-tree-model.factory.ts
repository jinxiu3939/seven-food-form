import { ModelType, CheckboxTreeModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 多选树模型工厂
 */
export class CheckboxTreeModelFactory extends BaseModelFactory {
  protected model: CheckboxTreeModel;
  protected type: ModelType = 'checkbox-tree';

  constructor(obj: any) {
    super(obj);
  }

  protected format(): void {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = [];
    }
    if (! Array.isArray(this.model.value)) {
      this.model.value = [this.model.value];
    }
    /* 必填项 */
    if (this.model.require) {
      if (!this.model.min || this.model.min <= 0) {
        this.model.min = 1; // 必填
      }
    }
  }
}
