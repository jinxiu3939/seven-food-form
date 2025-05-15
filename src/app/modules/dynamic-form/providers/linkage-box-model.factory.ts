import { ModelType, LinkageBoxTreeModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 联动下拉框模型工厂
 */
export class LinkageBoxModelFactory extends BaseModelFactory {
  protected model: LinkageBoxTreeModel;
  protected type: ModelType = 'linkage-box';

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
