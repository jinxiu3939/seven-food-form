import { ModelType, TextRangeModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 范围文本框模型工厂
 */
export class TextRangeModelFactory extends BaseModelFactory {
  protected model: TextRangeModel;

  protected type: ModelType = 'text-range';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用，若禁用表单组件自动设置为disabled
    this.config.kind = 'text'; // 文本框类型
    this.config.placeholder = ''; // 默认无提示
    this.config.readonly = false; // 默认非只读
    this.config.value = {op: '', text: ''}; // 默认值
    this.config.operations = [
        { text: '>', value: '>' },
        { text: '>=', value: '>=' },
        { text: '<', value: '<' },
        { text: '<=', value: '<=' },
        { text: '!=', value: '!=' },
    ]; // 操作符
    this.config.position = 'left'; // 位置
  }

  format() {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = {op: '', text: ''};
    }
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
