import { ModelType, UEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { deepExtend } from '../helps';

// 配置文件：assets/ueditor/ueditor.config.js
const defaultUEditorConfig = (window as any).UEDITOR_CONFIG;

/**
 * ueditor富文本模型工厂
 */
export class UEditorModelFactory extends BaseModelFactory {
  protected model: UEditorModel;
  protected type: ModelType = 'u-editor';

  constructor(obj: any) {
    super(obj);
    /* `editor`配置 */
    this.config.editorConfig = deepExtend({}, defaultUEditorConfig, this.config.editorConfig);
  }

  /**
   * 数据处理、默认赋值
   * 子类应该重写此方法
   */
  protected format(): void {
    /* 允许进入编辑器的div标签自动变成p标签 */
    if (this.config.allowDivTransToP === false) {
      this.config.editorConfig.allowDivTransToP = this.config.allowDivTransToP;
    }
    if (this.config.initialFrameHeight > 0) {
      this.config.editorConfig.initialFrameHeight = this.config.initialFrameHeight;
    }
    if (this.config.initialFrameWidth > 0) {
      this.config.editorConfig.initialFrameHeight = this.config.initialFrameWidth;
    }
    if (this.config.lang) {
      this.config.editorConfig.lang = this.config.lang;
    }
    if (this.config.readonly === true) {
      this.config.editorConfig.readonly = this.config.readonly;
    }
    if (this.config.wordCount === false) {
      this.config.editorConfig.wordCount = this.config.wordCount;
    }
    /* 编辑器层级的基数  */
    if (this.config.zIndex > 0) {
      this.config.editorConfig.zIndex = this.config.zIndex;
    }
  }
}
