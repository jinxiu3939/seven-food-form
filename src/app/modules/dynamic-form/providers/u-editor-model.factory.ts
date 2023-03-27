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
    if (this.model.allowDivTransToP === false) {
      this.model.editorConfig.allowDivTransToP = this.model.allowDivTransToP;
    }
    if (this.model.initialFrameHeight > 0) {
      this.model.editorConfig.initialFrameHeight = this.model.initialFrameHeight;
    }
    if (this.model.initialFrameWidth > 0) {
      this.model.editorConfig.initialFrameHeight = this.model.initialFrameWidth;
    }
    if (this.model.lang) {
      this.model.editorConfig.lang = this.model.lang;
    }
    if (this.model.readonly === true) {
      this.model.editorConfig.readonly = this.model.readonly;
    }
    if (this.model.wordCount === false) {
      this.model.editorConfig.wordCount = this.model.wordCount;
    }
    /* 编辑器层级的基数  */
    if (this.model.zIndex > 0) {
      this.model.editorConfig.zIndex = this.model.zIndex;
    }
  }
}
