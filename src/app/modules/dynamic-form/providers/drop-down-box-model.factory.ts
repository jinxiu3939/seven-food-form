import { BaseModelFactory } from './base-model.factory';
import { ModelType, Option, RadioModel } from '../dynamic-form.options';

/**
 * 下拉框模型工厂
 */
export class DropDownBoxModelFactory extends BaseModelFactory {
  protected model: RadioModel;
  protected type: ModelType = 'drop-down-box';
  private emptyOption: Option<any> = {text: '请选择', value: ''};

  protected format(): void {
    // 非必填追加空值
    if (!this.model.require) {
      if (this.model.options) {
        const empty_values = this.model.options.filter((data) => !data.value);
        if (empty_values.length === 0) {
          this.model.options = [this.emptyOption].concat(this.model.options);
        }
      } else {
        this.model.options = [this.emptyOption];
      }
    }

    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
