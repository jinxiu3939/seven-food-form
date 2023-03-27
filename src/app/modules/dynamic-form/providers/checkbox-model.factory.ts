import { ModelType, CheckboxModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 多选项模型工厂
 */
export class CheckboxModelFactory extends BaseModelFactory {
  protected model: CheckboxModel;
  protected type: ModelType = 'checkbox';

  constructor(obj: any) {
    super(obj);
    this.config.clear = false; // 默认不清空数据
    this.config.value = []; // 默认值
  }

  protected format(): void {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = [];
    }
    if (! Array.isArray(this.model.value)) {
      this.model.value = [this.model.value];
    }
    if (this.model.clear) { // 清空不合法的值
      const values = this.model.options.map((option) => {
        return option.value;
      });
      this.model.value = this.model.value.filter((val) => values.includes(val));
    }
    /* 必填项 */
    if (this.model.require) {
      if (!this.model.min || this.model.min <= 0) {
        this.model.min = 1; // 必填
      }
    }
  }
}
