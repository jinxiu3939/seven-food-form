import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 日期文本框模型工厂
 */
export class DateTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'date'; // 文本框类型
  }

  format() {
    if (this.model.clear) { // 清空不合法的日期时间格式
      const reg = /^\d{4}-\d{2}-\d{2}$/;
      if (reg.test(this.model.value) === false) {
        this.model.value = null;
      }
    }
  }
}
