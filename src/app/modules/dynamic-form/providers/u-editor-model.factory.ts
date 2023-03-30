import { ModelType, UEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { deepExtend } from '../helps';

// 配置文件：assets/ueditor/ueditor.config.js
const defaultUEditorConfig = (window as any).UEDITOR_CONFIG; // ueditor未加载之前，可能未定义

/**
 * ueditor富文本模型工厂
 * 兼容disabled属性
 */
export class UEditorModelFactory extends BaseModelFactory {
  protected model: UEditorModel;
  protected type: ModelType = 'u-editor';

  constructor(obj: any) {
    super(obj);
    this.config.editorConfig = deepExtend({}, defaultUEditorConfig);
  }

  /**
   * 数据处理、默认赋值
   * 子类应该重写此方法
   */
  protected format(): void {
    /* 内容处理 */
    /* 允许进入编辑器的div标签自动变成p标签 */
    if (this.model.allowDivTransToP === false) {
      this.model.editorConfig.allowDivTransToP = this.model.allowDivTransToP;
    }
    if (this.model.retainOnlyLabelPasted === true) {
      this.model.editorConfig.retainOnlyLabelPasted = this.model.retainOnlyLabelPasted;
    }

    /* 自动行高 */
    if (this.model.autoHeightEnabled === false) {
      this.model.editorConfig.autoHeightEnabled = this.model.autoHeightEnabled;
    }
    if (this.model.initialFrameHeight > 0) {
      this.model.editorConfig.initialFrameHeight = this.model.initialFrameHeight;
    }

    /* 多语言 */
    if (this.model.lang) {
      this.model.editorConfig.lang = this.model.lang;
    }

    /* 是否只读 */
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
    if (this.model.readonly === true) {
      this.model.editorConfig.readonly = this.model.readonly;
    }

    /* 字数统计 */
    if (this.model.wordCount === false) {
      this.model.editorConfig.wordCount = this.model.wordCount;
    }
    if (this.model.maximumWords > 0) {
      this.model.editorConfig.maximumWords = this.model.maximumWords;
    }

    /* 层级悬浮 */
    /* 工具栏悬浮有两种解决办法：1.topOffset设置为0,zIndex设置很大;2.topOffset设置为固定的头部的高度,zIndex不设置 */
    if (this.model.autoFloatEnabled === false) {
      this.model.editorConfig.autoFloatEnabled = this.model.autoFloatEnabled;
    }
    if (this.model.topOffset >= 0) {
      this.model.editorConfig.topOffset = this.model.topOffset;
    }
    if (this.model.zIndex > 0) {
      this.model.editorConfig.zIndex = this.model.zIndex;
    }
  }
}
