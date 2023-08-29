import { ModelType, CustomModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 自定义弹出窗口模型工厂
 */
export class CustomModelFactory extends BaseModelFactory {
  protected model: CustomModel;
  protected type: ModelType = 'custom';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
  }
}
