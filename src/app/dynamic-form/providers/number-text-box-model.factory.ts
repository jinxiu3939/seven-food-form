import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 数字文本框模型工厂
 */
export class NumberTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'number'; // 文本框类型
  }

  format() {
    if (this.model.clear) { // 清空不合法的数字
      if (isNaN(+this.model.value)) {
        this.model.value = null;
      }
    }
  }
}
