import { ModelType, ItemListModel } from '../dynamic-form.options';
import { BaseModelFactory } from './base-model.factory';

/**
 *  子项目列表模型工厂
 */
export class ItemListModelFactory extends BaseModelFactory {
  protected model: ItemListModel;

  protected type: ModelType = 'item-list';

  constructor(obj: any) {
    super(obj);
    this.config.attributes = [];
    this.config.disabled = false; // 默认不禁用
  }

  format() {
    /* 值为数组 */
    if (! this.model.value) {
      this.model.value = [];
    }
    if (! Array.isArray(this.model.value)) {
      this.model.value = [this.model.value];
    }
    this.model.value = this.model.value.map((item) => {
      let result: Object = {};
      if (item instanceof Object) {
        this.model.attributes.forEach((field) => {
          if (item[field.value] === undefined) {
            item[field.value] = null;
          }
        });
        result = item;
      } else { // 不是一个对象
        this.model.attributes.forEach((field) => {
          result[field.value] = item;
        });
      }
      return result;
    });
  }
}
