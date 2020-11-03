import { ModelType, VideoModel, UploadConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
    topic: '',
  },
  allowedFileType: ['video'],
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'video', // 表单名称
  maxFileSize: 1024 * 1024 * 300, // 300M
  method: 'POST',
  url: '', // 上传地址
};

/**
 * 视频模型工厂
 */
export class VideoModelFactory extends BaseModelFactory {
  protected model: VideoModel;
  protected type: ModelType = 'video';

  constructor(obj: any) {
    super(obj);

    this.config.disabled = false; // 默认不禁用
    this.config.kind = 'ng2-file-upload'; // 默认上传模块
    this.config.multiple = false; // 默认单图

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
}
