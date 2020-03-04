import { ModelType, DatePickerModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import * as moment from 'moment';

/**
 * 多选项模型工厂
 */
export class DatePickerModelFactory extends BaseModelFactory {
  protected model: DatePickerModel;
  protected type: ModelType = 'date-picker';

  constructor(obj: any) {
    super(obj);
    this.config.clear = false; // 默认不清空
    this.config.disabled = false; // 默认不禁用
    this.config.format = 'YYYY-MM-DD HH:mm:ss'; // 日期格式
    this.config.kind = 'date-time'; // 类别
    this.config.now = false; // 是否默认当前时间
  }

  protected format(): void {
    if (this.model.clear) { // 清空不合法的值
      if (this.model.value) {
        // 值转换成日期，然后转换成字符串完成格式校验
        this.model.value = moment(new Date(this.model.value)).format(this.config.format);
        if (this.model.value === 'Invalid date') {
          this.model.value = null;
        }
      }
    }
    if (this.model.now) {
      if (! this.model.value) {
        this.model.value = moment(new Date()).format(this.config.format);
      }
    }
  }
}
