import { ModelType, ImageModel, UploadConfig, CrawlConfig, ResourceSearchConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
    topic: '',
  },
  allowedFileType: ['image'],
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'image', // 表单名称
  maxFileSize: 1024 * 1024 * 2, // 2M
  method: 'POST',
  url: '', // 上传地址
};

/**
 * 图片模型工厂
 */
export class ImageModelFactory extends BaseModelFactory {
  protected model: ImageModel;
  protected type: ModelType = 'image';
  private crawlConfig: CrawlConfig = {
    additionalParameter: {
      tag: [],
      title: '',
      topic: '',
    },
    api: '', // 保存地址
    headers: {}, // 保存接口请求头
    queueLimit: null,
  }; // 网络图片抓取配置
  private searchConfig: ResourceSearchConfig = {
    additionalParameter: {
      creation_time: null, // 创建时间
      file_name: null, // 文件名称
      page_number: 1,
      page_size: 2000,
      tag: null, // 标签
      title: null, // 标题/描述
      topic: null, // 主题
      type: 'image', // 类型
    },
    api: '',
    display: 'page',
    headers: {}, // 检索接口请求头
    mode: 'sync',
    queueLimit: null,
    result: [],
  }; // 图片检索配置

  constructor(obj: any) {
    super(obj);
    /* 抓取配置 */
    this.config.crawlConfig = this.crawlConfig;
    this.config.disabled = false; // 默认不禁用
    this.config.display = 'image'; // 图片展示方式
    this.config.kind = 'ng2-file-upload'; // 默认上传模块
    this.config.multiple = false; // 默认单图
    /* 检索配置 */
    if (obj.list) {
      this.searchConfig.result = obj.list;
    }
    this.config.searchConfig = this.searchConfig;
    /* 上传配置 */
    switch (obj.kind) {
      case 'ng2-file-upload' : {
        this.config.uploadConfig = ng2FileUploadConfig;
        break;
      }
      // [todo] other
      // 默认使用`ng2-file-upload`上传
      default : {
        this.config.uploadConfig = ng2FileUploadConfig;
      }
    }
  }

  format() {
    if (this.model.searchConfig.display === 'page') {
      this.model.searchConfig.additionalParameter.page_size = 9;
    }
  }
}
