import { ModelType, MdEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

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
  toolbarIcons : function() {
    return ["undo", "redo", "|", "bold", "quote", "ucwords", "list-ul", "list-ol", "hr", "|", "image", "code", "preformatted-text", "code-block", "table", "html-entities", "pagebreak", "|", "preview", "watch"]
  },
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
    this.config.editorConfig = classicMarkDownEditorConfig;
  }

  /**
   * 数据处理、默认赋值
   * 子类应该重写此方法
   */
  protected format(): void {
    /* 是否只读 */
    if (this.model.disabled === true) {
      this.model.readonly = true;
    }
    if (this.model.readonly === true) {
      this.model.editorConfig.readOnly = this.model.readonly;
    }

    if (+this.model.height > 0) {
      this.model.editorConfig.height = this.model.height;
    }
  }
}
