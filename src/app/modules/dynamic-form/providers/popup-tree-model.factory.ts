import { ModelType, PopupTreeModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 弹出树结构窗口模型工厂
 */
export class PopupTreeModelFactory extends BaseModelFactory {
  protected model: PopupTreeModel;
  protected type: ModelType = 'popup-tree';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.mode = 'sync'; // 加载方式
    this.config.text = ''; // 默认文本
    this.config.tree = []; // 默认树
    this.config.value = ''; // 默认值
  }

  protected format(): void {
    /* 尺寸 */
    if (!this.model.size) {
      this.model.size = 'medium'; // 尺寸
    }
  }
}
