import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseModel, FormSetting, VALIDATORS } from './dynamic-form.options';
import { formatWidth } from './helps';
import { LANG } from './lang/lang.const';
import { LangProvider } from './providers/data/lang.provider';

@Component({
  selector: 'sff-dynamic-form',
  styleUrls: ['./dynamic-form.component.scss'],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input() models: BaseModel<any>[]; // 表单项
  @Input() setting: FormSetting; // 设置
  @Input() lang: string = 'zh'; // 语言包代码
  @Input() loading: boolean; // 加载状态

  @Output() public formSubmit = new EventEmitter<any>(); // 表单提交事件
  @Output() public formReset = new EventEmitter<boolean>(); // 表单重置事件
  @Output() public formCustom = new EventEmitter<{form:any, name: string}>(); // 其他点击事件

  form: FormGroup; // 响应式表单
  complete: boolean; // 表单是否构建完毕
  textContainer: any; // 语言包
  reload: number; // 重新加载时间戳
  formExpand: boolean = true; // 是否展开
  level: number = 0; // 表单层级
  modelsTree: any[]; // 表单模型树

  constructor(private builder: FormBuilder, private langProvider: LangProvider) {
    this.textContainer = this.langProvider.lang; // 设置语言包
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'models' && changes[propName].currentValue) {
        this.form = this.generateForm(); // 构造表单
      } else if (propName === 'setting' && changes[propName].currentValue) {
        this.form = this.generateForm(); // 构造表单
      } else if (propName === 'lang' && changes[propName].currentValue) {
        let key = changes[propName].currentValue;
        if (key.indexOf('-') > 0) {
          key = key.substr(0, key.indexOf('-'));
        }
        if (LANG[key]) {
          this.textContainer = LANG[key];
        } else {
          this.textContainer = LANG.zh;
        }
        this.langProvider.lang = this.textContainer; // 设置语言包
      }
    }
  }

  /**
   * 生成表单
   */
  generateForm() {
    let form = this.builder.group({}); // 响应式表单
    this.complete = false; // 开始构建
    if (this.models && Array.isArray(this.models) && this.models.length > 0) {
      /* 创建表单元素 */
      form = this.createGroup(form);

      /* 解析表单设置 */
      this.parseSetting();

      this.complete = true; // 构建完毕
    }
    return form;
  }

  /*
   * 创建表单元素
   */
  createGroup(form) {
    this.models.map(model => {
      if (model.name) {
        form.addControl(model.name, this.builder.control(
          {value: model.value, disabled: model.disabled}, // 默认值
          this.fetchValidator(model),
        ));
      }
    });

    return form;
  }

  parseSetting() {
    if (this.setting) {
      /* 解析菜单层级 */

      /* 一级表单 */
      this.level = 0;
      if (this.setting.bodyWidth && this.setting.buttonWidth) {
      } else if (this.setting.bodyWidth) {
        this.setting.buttonWidth = 12 - this.setting.bodyWidth;
      } else if (this.setting.buttonWidth) {
        this.setting.bodyWidth = 12 - this.setting.buttonWidth;
      }
      this.setting.bodyWidth = formatWidth(this.setting.bodyWidth);
      this.setting.buttonWidth = formatWidth(this.setting.buttonWidth);
      if (this.setting.foldBody === true) {
        this.formExpand = !this.setting.foldBody;
      }
      if (this.setting.validate !== false) {
        this.setting.validate = true; // 默认验证
      }

      /* 二级表单 */
      if (this.setting.children && Array.isArray(this.setting.children) && this.setting.children.length > 0) {
          this.level = 1;
          
          this.setting.children.map((children) => {
            /* 三级表单 */
            if (children.children && Array.isArray(children.children) && children.children.length > 0) {
              this.level = 2;
              this.modelsTree = [];
            }
          });
      }

      /* models分层 */
      if (this.level === 0) {
        this.modelsTree = this.sort(this.models);
      } else if (this.level === 1) {
        this.modelsTree = [];
        this.setting.children.map((block) => {
          this.modelsTree.push(this.sort(this.models.filter((model) => model.block === block.blockId)));
        });
      } else if (this.level === 2) {
        this.modelsTree = [];
        this.setting.children.map((block, i) => {
          if (block.children.length > 0) {
            this.modelsTree[i] = [];
            block.children.map((t) => {
              this.modelsTree[i].push(this.sort(this.models.filter((model) => model.block === t.blockId)));
            });
          }
        });
      }
    } else {
      this.setting = {} as FormSetting;
      this.modelsTree = this.sort(this.models);
    }
  }

  /**
   * 折叠表单内容
   */
  foldBody(flag) {
    this.formExpand = !flag;
  }

  /**
   * 提交表单
   */
  onSubmit(flag) {
    if (flag) {
      this.formSubmit.emit(this.form.value); // 发送表单值
    }
  }

  /*
   * 重置表单
   */
  onReset(flag) {
    this.form.reset();
    this.reload = flag;
    this.formReset.emit(true);
  }

  /**
   * 自定义表单操作
   */
  onOperate(operation) {
    this.formCustom.emit({ form: this.form.value, name: operation });
  }

  /**
   * 构造表单验证器
   * @param model 模型
   * @returns 
   */
  private fetchValidator(model: BaseModel<any>) {
    const validator = [];
    if (model.require === true) {
      validator.push(Validators.required);
    }
    if (model.min && model.min > 0) {
      validator.push(Validators.minLength(model.min));
    }
    if (model.max && model.max > 0) {
      validator.push(Validators.maxLength(model.max));
    }
    if (model.validator && VALIDATORS[model.validator]) {
      validator.push(VALIDATORS[model.validator]());
    }
    return validator;
  }

  /**
   * 模型排序
   */
  private sort(inputs: BaseModel<any>[]) {
    if (inputs) {
      return inputs.sort((a, b) => a.order - b.order);
    } else {
      return [];
    }
  }  
}
