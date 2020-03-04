import { ModelType, PopupRadioModel, SearchConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 弹出单选项窗口模型工厂
 */
export class PopupRadioModelFactory extends BaseModelFactory {
  protected model: PopupRadioModel;
  protected type: ModelType = 'popup-radio';
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
    this.config.text = ''; // 默认文本
    this.config.value = ''; // 默认值
  }
}
