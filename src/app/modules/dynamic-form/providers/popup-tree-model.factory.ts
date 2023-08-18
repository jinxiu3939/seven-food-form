import { ModelType, PopupTreeModel, SearchConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 弹出树结构窗口模型工厂
 */
export class PopupTreeModelFactory extends BaseModelFactory {
  protected model: PopupTreeModel;
  protected type: ModelType = 'popup-tree';
  private searchConfig: SearchConfig = {
    additionalParameter: {},
    mode: 'sync',
  }; // 检索配置

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.searchConfig = this.searchConfig; // 检索配置
    this.config.text = ''; // 默认文本
    this.config.tree = []; // 默认树
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
