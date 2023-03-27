import { ModelType, DatePickerModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { dateFormat } from '../helps';

/**
 * 多选项模型工厂
 */
export class DatePickerModelFactory extends BaseModelFactory {
  protected model: DatePickerModel;
  protected type: ModelType = 'date-picker';

  constructor(obj: any) {
    super(obj);
    this.config.clear = false; // 默认不清空
    this.config.format = 'YYYY-MM-DD HH:mm:ss'; // 日期格式
    this.config.kind = 'date-time'; // 类别
    this.config.now = false; // 是否默认当前时间
    this.config.readonly = false; // 默认非只读
  }

  protected format(): void {
    if (this.model.clear) { // 清空不合法的值
      if (this.model.value) {
        const date = new Date(this.model.value);
        if (date.toString() === 'Invalid Date') {
          this.model.value = '';
        } else {
          this.model.value = dateFormat(new Date(this.model.value), this.model.format);
        }
      }
    }
    if (this.model.now) {
      if (! this.model.value) {
        this.model.value = dateFormat(new Date(), this.model.format);
      }
    };
  }
}
