import { ModelType, TextDiffModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 比较文本框模型工厂
 */
export class TextDiffModelFactory extends BaseModelFactory {
  protected model: TextDiffModel;

  protected type: ModelType = 'text-diff';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用，若禁用表单组件自动设置为disabled
    this.config.kind = 'text'; // 文本框类型
    this.config.placeholder = ''; // 默认无提示
    this.config.value = {op: '', text: ''}; // 默认值，操作符-的值请使用***-***的格式
    this.config.operators = [
        { text: '=', value: '=' },
        { text: '!=', value: '!=' },
        { text: '>', value: '>' },
        { text: '>=', value: '>=' },
        { text: '<', value: '<' },
        { text: '<=', value: '<=' },
        { text: '!', value: '!' }, // 不等于
        { text: '-', value: '-' }, // 从...-...
    ]; // 操作符
    this.config.position = 'left'; // 位置
  }

  format() {
    /* 值为对象 */
    if (! this.model.value) {
      this.model.value = {op: '', text: ''};
    }
  }
}
