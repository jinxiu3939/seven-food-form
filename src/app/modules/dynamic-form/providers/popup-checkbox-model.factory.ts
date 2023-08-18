import { ModelType, PopupCheckboxModel, SearchConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 弹出复选项窗口模型工厂
 */
export class PopupCheckboxModelFactory extends BaseModelFactory {
  protected model: PopupCheckboxModel;
  protected type: ModelType = 'popup-checkbox';
  private searchConfig: SearchConfig = {
    additionalParameter: {},
    conditions: [],
    mode: 'sync',
    result: [],
    size: 20,
  }; // 检索配置

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.options = []; // 默认选项
    this.config.searchConfig = this.searchConfig; // 检索配置
    this.config.text = []; // 默认文本
  }

  protected format(): void {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = [];
    }
    if (! Array.isArray(this.model.value)) {
      this.model.value = [this.model.value];
    }

    /* 显示文本为数组 */
    if (! this.model.text) {
      this.model.text = [];
    }

    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
  }
}
