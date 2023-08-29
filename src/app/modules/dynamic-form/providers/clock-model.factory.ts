import { ModelType, ClockModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 时钟模型工厂
 */
export class ClockModelFactory extends BaseModelFactory {
  protected model: ClockModel;
  protected type: ModelType = 'clock';

  constructor(obj: any) {
    super(obj);
    this.config.kind = 24; // 类别
    this.config.now = false; // 是否默认当前时间
    this.config.readonly = false; // 默认非只读
  }

  protected format(): void {
    if (this.model.now) {
      if (! this.model.value) {
        this.model.value = {
          h: (new Date()).getHours() + '',
          i: (new Date()).getMinutes() + '',
          a: ''
        };
      }
    };
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
    if (this.model.kind === 12) {
      if (parseInt(this.model.value.h) > 11) {
        this.model.value.h = parseInt(this.model.value.h) % 12 + '';
        this.model.value.a = 'pm';
      }
    }
  }
}
