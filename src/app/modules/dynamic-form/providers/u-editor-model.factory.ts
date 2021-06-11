import { ModelType, UEditorModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';
import { deepExtend } from '../helps';

// 富文本框编辑器配置信息
const classicUEditorConfig = {
  wordCount: true, // 文字计数
  maximumWords: 10000, // 最多文字
  initialFrameHeight: 800, // 设置高度
  initialFrameWidth: '100%', // 设置宽度
  enableAutoSave: false,
  lang: "en", // 语言包
  /* 上传图片配置项 */
  imageActionName: 'uploadimage', /* 执行上传图片的action名称 */
  imageFieldName: 'upfile', /* 提交的图片表单名称 */
  imageMaxSize: 2048000, /* 上传大小限制，单位B */
  imageAllowFiles: [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.bmp',
  ], /* 上传图片格式显示 */
  enableDragUpload: true, // 启用拖放上传
  enablePasteUpload: true, // 启用粘贴上传
  imageCompressEnable: true, /* 是否压缩图片,默认是true */
  imageCompressBorder: 1600, /* 图片压缩最长边限制 */
  imageInsertAlign: 'none', /* 插入的图片浮动方式 */
  imageUrlPrefix: '', /* 图片访问路径前缀,可配置您的文件访问地址 */
  imagePathFormat: '', /* 上传保存路径,可以自定义保存路径和文件名格式，不使用本地保存，可不配置 */
  replace: '',
  zIndex: 2000,
  autoFloatEnabled: false, // 是否保持toolbar的位置不动
  serverUrl: '/api/access/my.ueditor/index', // 服务器统一请求接口路径
  toolbars: [
      [
          'bold', 'italic', 'underline', 'blockquote', 'removeformat', '|',
          'fontfamily', 'fontsize', 'paragraph', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
          'source', '|', 'undo', 'redo', '|', 'link', 'unlink', '|',
          'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
          'insertimage', 'insertcode', '|',
          'inserttable'
      ],
  ],
};

// 富文本框编辑器配置信息
const fullUEditorConfig = {
  initialFrameHeight: 520, // 设置高度
  initialFrameWidth: '100%', // 设置宽度
  enableAutoSave: false,
  /* 上传图片配置项 */
  imageActionName: 'uploadimage', /* 执行上传图片的action名称 */
  imageFieldName: 'upfile', /* 提交的图片表单名称 */
  imageMaxSize: 2048000, /* 上传大小限制，单位B */
  imageAllowFiles: [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.bmp',
  ], /* 上传图片格式显示 */
  enableDragUpload: true, // 启用拖放上传
  enablePasteUpload: true, // 启用粘贴上传
  imageCompressEnable: true, /* 是否压缩图片,默认是true */
  imageCompressBorder: 1600, /* 图片压缩最长边限制 */
  imageInsertAlign: 'none', /* 插入的图片浮动方式 */
  imageUrlPrefix: '', /* 图片访问路径前缀,可配置您的文件访问地址 */
  imagePathFormat: '', /* 上传保存路径,可以自定义保存路径和文件名格式，不使用本地保存，可不配置 */
  replace: '',
  zIndex: 2000,
  serverUrl: '/api/access/my.ueditor/index', // 服务器统一请求接口路径
  toolbars: [
      [
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|',
          'fontfamily', 'fontsize', 'customstyle', 'paragraph', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'source', '|', 'undo', 'redo', '|',
          'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'emotion', 'scrawl', 'attachment', 'insertcode', '|',
          'horizontal', 'date', 'time', 'spechars', 'wordimage', '|',
          'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
          'preview', 'searchreplace'
      ],
  ],
};

const defaultUEditorConfig = (window as any).UEDITOR_CONFIG;

/**
 * ueditor富文本模型工厂
 */
export class UEditorModelFactory extends BaseModelFactory {
  protected model: UEditorModel;
  protected type: ModelType = 'u-editor';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    /* `editor`配置 */
    let defaultConfig: any;
    switch (obj.kind) {
      // 简洁按钮
      case 'classic' : {
        defaultConfig = classicUEditorConfig;
        break;
      }
      // 全部按钮
      case 'full' : {
        defaultConfig = fullUEditorConfig;
        break;
      }
      // default
      default : {
        defaultConfig = defaultUEditorConfig; // 默认使用外部配置
      }
    }
    this.config.editorConfig = deepExtend({}, defaultConfig, this.config.editorConfig);
    this.config.kind = 'classic'; // 默认`build`
  }
}
