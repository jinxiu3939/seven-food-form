import { ModelType, TextBoxModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 文本框模型工厂
 */
export class TextBoxModelFactory extends BaseModelFactory {
  protected model: TextBoxModel;

  protected type: ModelType = 'text-box';

  constructor(obj: any) {
    super(obj);
    this.config.clear = false; // 默认不清空数据
    this.config.disabled = false; // 默认不禁用
    this.config.kind = 'text'; // 文本框类型
    this.config.placeholder = ''; // 默认无提示
    this.config.readonly = false; // 默认非只读
    this.config.value = ''; // 默认值
  }
}
