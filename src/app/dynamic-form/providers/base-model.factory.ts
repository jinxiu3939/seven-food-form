import { BaseModel, ModelType } from '../dynamic-form.options';
import { deepExtend } from '../helps';

/**
 * 通用表单项模型工厂
 * 工厂的目的是根据任意参数，实例化正确的对象
 *
 * @usageNotes
 *
 * new `BaseModelFactory子类`({}).instance();
 *
 */
export abstract class BaseModelFactory {
  protected model: BaseModel<any>; // 表单项模型

  protected type: ModelType; // 表单项类型，集成体系基于此类型

  protected config: any = {}; // 默认配置值
  protected setting: object = {}; // 用户设置

  constructor(obj: any) {
    this.setting = obj;
  }

  /**
   * 数据处理、默认赋值
   * 子类应该重写此方法
   */
  protected format(): void {}

  /**
   * 返回实例化模型
   */
  instance() {
    this.model = deepExtend({}, this.config, this.setting);
    this.format(); // 数据处理
    this.model.type = this.type; // 确保类型正确
    return this.model;
  }
}
