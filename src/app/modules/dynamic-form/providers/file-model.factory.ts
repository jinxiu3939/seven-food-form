import { ModelType, FileModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 * 文件模型工厂
 */
export class FileModelFactory extends BaseModelFactory {
  protected model: FileModel;
  protected type: ModelType = 'file';

  constructor(obj: any) {
    super(obj);
    if (! obj.accept) {
      if (!Array.isArray(obj.kind)) {
        obj.kind = [obj.kind];
      }
      if (obj.kind.length > 0) {
        const accept = [];
        for(var i in obj.kind) {
          switch (obj.kind[i]) {
            // 电子表格
            case 'xls': {
              accept.push('.csv');
              accept.push('application/vnd.ms-excel');
              accept.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              break;
            }
            // word
            case 'word': {
              accept.push('application/msword');
              accept.push('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
              break;
            }
            // 普通文本
            case 'txt': {
              accept.push('text/plain');
              break;
            }
            // 图片
            case 'image': {
              accept.push('image/*');
              break;
            }
            // 视频
            case 'video': {
              accept.push('video/*');
              break;
            }
            // 音频
            case 'audio': {
              accept.push('audio/*');
              break;
            }
            // pdf
            case 'pdf': {
              accept.push('.pdf');
              break;
            }
            // json
            case 'json': {
              accept.push('.json');
              break;
            }
            // zip
            case 'zip': {
              accept.push('.zip');
              break;
            }
          }
        }
        this.config.accept = '';
        accept.map((item, key) => {
          if (key > 0) {
            this.config.accept += ',';
          }
          this.config.accept += item;
        });
      }
    }
  }

  format() {
    if (!this.model.accept) {
      this.model.accept = '*';
    }
  }
}
