import { ModelType, RadioModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 单选项模型工厂
 */
export class RadioModelFactory extends BaseModelFactory {
  protected model: RadioModel;
  protected type: ModelType = 'radio';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    // this.config.width = 3; // 选项宽度
    this.config.all = false; // 默认不显示全部
  }
}
