import { RadioModelFactory } from './radio-model.factory';

/**
 * `boolean`型单选项模型工厂
 */
export class BooleanRadioModelFactory extends RadioModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.width = 6; // 选项宽度
    this.config.options = [
      { text: '是', value: true },
      { text: '否', value: false },
    ]; // 选项
  }

  protected format(): void {
    // 其他类型转换为`boolean`类型
    if (this.model.value) {
      this.model.value = true;
    } else if (this.model.value !== null && this.model.value !== undefined) {
      this.model.value = false;
    } else {
      this.model.value = null;
    }

    if (this.model.options.length < 2) {
      this.model.options = this.config.options;
    }

    if (this.model.all) {
      this.model.width = 4;
    }
  }
}
