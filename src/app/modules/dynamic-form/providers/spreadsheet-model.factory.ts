import { ModelType, SpreadsheetModel, UploadConfig } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

const ng2FileUploadConfig: UploadConfig = {
  additionalParameter: {
    tag: [],
    title: '',
  },
  allowedFileType: ['csv', 'xls', 'xlsx'],
  authTokenHeader: '',
  authToken: '',
  itemAlias: 'sheet', // 表单名称
  maxFileSize: 1024 * 1024 * 2, // 2M
  method: 'POST',
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
    this.config.uploadConfig = ng2FileUploadConfig;
    this.config.view = true; // 默认预览
  }
}
