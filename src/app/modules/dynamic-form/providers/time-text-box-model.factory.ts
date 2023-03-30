import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 时间文本框模型工厂
 */
export class TimeTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'time'; // 文本框类型
    this.config.clear = true; // 清空不合法的时间格式
  }

  format() {
    if (this.model.clear) { // 清空不合法的时间格式
      const reg = new RegExp('^(\\d){2}:(\\d){2}$');
      if (reg.test(this.model.value) === false) {
        this.model.value = null;
      }
    }
  }
}
