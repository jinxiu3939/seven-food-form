import { BaseModelFactory } from './base-model.factory';
import { ModelType, Option, RadioModel } from '../dynamic-form.options';

/**
 * 下拉框模型工厂
 */
export class DropDownBoxModelFactory extends BaseModelFactory {
  protected model: RadioModel;
  protected type: ModelType = 'drop-down-box';
  private emptyOption: Option<any> = {text: '请选择', value: ''};

  constructor(obj: any) {
    super(obj);
  }

  protected format(): void {
    // 非必填追加空值
    if (!this.model.require) {
      const empty_values = this.model.options.filter((data) => !data.value);
      if (empty_values.length === 0) {
        this.model.options = [this.emptyOption].concat(this.model.options);
      }
    }
  }
}
