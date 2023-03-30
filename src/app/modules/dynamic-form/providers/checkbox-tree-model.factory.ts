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
    
    /* 是否只读 */
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
