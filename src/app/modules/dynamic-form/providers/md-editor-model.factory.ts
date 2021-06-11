import { ModelType, MdEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { deepExtend } from '../helps';

// 富文本框编辑器配置信息
const classicMarkDownEditorConfig = {
  width: '100%',
  height: '800',
  path: './assets/editor.md/lib/',
  codeFold: true,
  searchReplace: true,
  toolbar: true,
  emoji: true,
  taskList: true,
  tex: true,
  readOnly: false,
  tocm: true,
  watch: true,
  previewCodeHighlight: true,
  saveHTMLToTextarea: true,
  markdown: '',
  flowChart: true,
  syncScrolling: true,
  sequenceDiagram: true,
  imageUpload: true,
  imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
  imageUploadURL: '/api/access/tool.mdeditor/image',
  styleActiveLine: false,
};

/**
 * mdeditor富文本模型工厂
 */
export class MdEditorModelFactory extends BaseModelFactory {
  protected model: MdEditorModel;
  protected type: ModelType = 'md-editor';

  constructor(obj: any) {
    super(obj);
    /* `editor`配置 */
    this.config.editorConfig = deepExtend({}, this.config.editorConfig, classicMarkDownEditorConfig);
  }
}
