import { ModelType, PopupCustomModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 自定义弹出窗口模型工厂
 */
export class PopupCustomModelFactory extends BaseModelFactory {
  protected model: PopupCustomModel;
  protected type: ModelType = 'popup-custom';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.text = ''; // 默认文本
    this.config.value = ''; // 默认值
  }

  protected format(): void {
    /* 尺寸 */
    if (!this.model.size) {
      this.model.size = 'medium'; // 尺寸
    }

    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
