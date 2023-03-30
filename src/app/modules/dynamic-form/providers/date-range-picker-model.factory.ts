import { ModelType, DateRangePickerModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { dateFormat } from '../helps';

/**
 * 日期范围选择模型工厂
 */
export class DateRangePickerModelFactory extends BaseModelFactory {
  protected model: DateRangePickerModel;
  protected type: ModelType = 'date-range-picker';

  constructor(obj: any) {
    super(obj);
    this.config.readonly = false;
    this.config.clear = false; // 默认不清空
    this.config.format = 'YYYY-MM-DD'; // 日期格式
  }

  protected format(): void {
    if (this.model.value) {
      if (this.model.value?.start) {
        if (this.model.clear) { // 清空不合法的值
          this.model.value.start = this.transform(this.model.value.start);
        }
      }

      if (this.model.value?.end) {
        if (this.model.clear) { // 清空不合法的值
          this.model.value.end = this.transform(this.model.value.end);
        }
      }
    }
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }

  private transform(value): string {
    let str: string;
    const date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      str = '';
    } else {
      str = dateFormat(new Date(value), this.config.format);
    }
    return str;
  }
}
