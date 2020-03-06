import { ModelType, SpreadsheetModel, UploadConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
    topic: '',
  },
  allowedFileType: ['csv', 'xls', 'xlsx'],
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'sheet', // 表单名称
  maxFileSize: 1024 * 1024 * 2, // 2M
  method: 'POST',
  queueLimit: 1, // 只能上传一个电子表格
  url: '', // 上传地址
};

/**
 * 电子表格模型工厂
 */
export class SpreadsheetModelFactory extends BaseModelFactory {
  protected model: SpreadsheetModel;
  protected type: ModelType = 'spreadsheet';

  constructor(obj: any) {
    super(obj);
    this.config.kind = 'ng2-file-upload'; // 默认上传模块
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
    this.config.view = true; // 默认预览
  }

  format() {
    this.model.uploadConfig.queueLimit = 1; // 只能上传一个电子表格
  }
}
