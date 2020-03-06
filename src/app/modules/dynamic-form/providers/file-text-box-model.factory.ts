import { TextBoxModelFactory } from './text-box-model.factory';

/**
 * 文件文本框模型工厂
 */
export class FileTextBoxModelFactory extends TextBoxModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'file'; // 文本框类型
  }

  format() {
    this.model.value = null;
  }
}
