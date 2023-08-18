import { ItemListModelFactory } from './item-list-model.factory';

/**
 * 键值对模型工厂
 */
export class KeyValueModelFactory extends ItemListModelFactory {
  constructor(obj: any) {
    super(obj);
    this.config.kind = 'key-value'; // 键值对类型
  }
}
