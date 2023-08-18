import { ModelType, VideoModel, UploadConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
  },
  allowedFileType: ['audio', 'video'], // 视频、音频
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'video', // 表单名称
  maxFileSize: 1024 * 1024 * 300, // 300M
  method: 'POST',
  url: '', // 上传地址
};

/**
 * 多媒体模型工厂
 * 兼容disabled属性
 */
export class VideoModelFactory extends BaseModelFactory {
  protected model: VideoModel;
  protected type: ModelType = 'video';

  constructor(obj: any) {
    super(obj);
    this.config.disabled = false; // 默认不禁用
    this.config.multiple = false; // 默认单文件
    this.config.queueLimit = 5; // 单次上传文件数量
    this.config.uploadConfig = ng2FileUploadConfig; // 上传配置
  }
}
