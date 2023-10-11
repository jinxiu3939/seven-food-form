import { BaseModelFactory } from './base-model.factory';
import { ModelType, AttachmentModel, UploadConfig, ResourceSearchConfig } from '../dynamic-form.options';

const maxFileSize = 1024 * 1024 * 5; // 5M

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
  },
  allowedFileType: ['compress'], // application,image,video,audio,pdf,compress,doc,xls,ppt
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'file', // 表单名称
  maxFileSize: maxFileSize, // 文件最大大小
  method: 'POST',
  url: '', // 上传地址
};

/**
 * 附件模型工厂
 */
export class AttachmentModelFactory extends BaseModelFactory {
  protected model: AttachmentModel;
  protected type: ModelType = 'attachment';
  private searchConfig: ResourceSearchConfig = {
    additionalParameter: {
      creation_time: null, // 创建时间
      file_name: null, // 文件名称
      page_number: 1,
      page_size: 200,
      tag: null, // 标签
      title: null, // 标题/描述
      type: 'file', // 类型
    },
    api: '',
    display: 'page',
    headers: {}, // 检索接口请求头
    mode: 'sync',
    result: [],
  }; // 图片检索配置

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.display = 'page'; // 展示方式
    this.config.multiple = false; // 默认单图

    /* 上传配置 */
    this.config.uploadConfig = ng2FileUploadConfig;
    if (obj.allowedUploadFileType) {
      if (typeof obj.allowedUploadFileType === 'string') {
        this.config.uploadConfig.allowedFileType = obj.allowedUploadFileType.split(",");
      } else if (Array.isArray(obj.allowedUploadFileType)) {
        this.config.uploadConfig.allowedFileType = obj.allowedUploadFileType;
      }
    }
    if (obj.maxUploadFileSize) {
      this.config.uploadConfig.maxFileSize = obj.maxUploadFileSize;
    }

    /* 检索配置 */
    if (obj.list) {
      this.searchConfig.result = obj.list;
    }
    if (obj.searchDisplay) {
      this.searchConfig.display = obj.searchDisplay;
    }
    if (obj.searchMode) {
      this.searchConfig.mode = obj.searchMode;
    }
    this.config.searchConfig = this.searchConfig;

  }

  format() {
    if (this.model.searchConfig.display === 'page') {
      this.model.searchConfig.additionalParameter.page_size = 16;
    }
    if (this.model.multiple && !this.model.queueLimit) {
      this.model.queueLimit = 10;
    }
  }
}
