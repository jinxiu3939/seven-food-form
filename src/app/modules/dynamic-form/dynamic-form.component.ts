import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseModel, FormButton, FormCategory, ModelGroup, VALIDATORS } from './dynamic-form.options';
import { LANG } from './lang/lang.const';
import { LangProvider } from './providers/data/lang.provider';

@Component({
  selector: 'ngx-dynamic-form',
  styleUrls: ['./dynamic-form.component.scss'],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input() tree: FormCategory[]; // 树（三级表单）
  @Input() models: ModelGroup[]; // 默认表单项分组配置，二级分类，兼容二级表单
  @Input() layout: string; // 默认布局
  @Input() buttons: FormButton[]; // 自定义操作按钮
  @Input() lang: string = 'zh'; // 语言包代码
  @Input() submitText = 'submit'; // 提交按钮名称
  @Input() resetText = 'reset'; // 重置按钮名称
  @Input() fold = false; // 是否显示折叠按钮
  @Input() submit = true; // 是否显示提交按钮
  @Input() reset = true; // 是否显示重置按钮
  @Input() validate = true; // 是否验证表单
  @Input() loading: boolean; // 表单状态

  @Output() public formSubmit = new EventEmitter<any>(); // 表单提交事件
  @Output() public formReset = new EventEmitter<boolean>(); // 表单重置事件
  @Output() public formCustom = new EventEmitter<any>(); // 其他点击事件

  form: FormGroup; // 响应式表单
  complete: boolean; // 表单是否构建完毕
  textContainer: any; // 语言包
  reload: number; // 重新加载时间戳
  blockInValid: number[] = []; // 字段分组验证是否错误
  formExpand: boolean = true; // 是否展开
  formFoldIcon: string = 'arrowhead-up'; // 表单内容折叠icon
  tabLayout; // 三级tab布局

  constructor(private builder: FormBuilder, private langProvider: LangProvider) {
    this.textContainer = this.langProvider.lang; // 设置语言包
    this.submitText = this.textContainer.submit;
    this.resetText = this.textContainer.reset;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'models' && changes[propName].currentValue) {
        this.form = this.generateForm(); // 构造表单
      } else if (propName === 'tree' && changes[propName].currentValue) {
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
    let form = this.builder.group({});
    this.tabLayout = [];
    this.complete = false; // 开始构建
    if (this.tree) {
      this.tree.map((children) => {

        if (children.components && Array.isArray(children.components)) {
          form = this.createGroup(form, children.components);
          this.tabLayout.push(children);
        }
      });
    }
    if (this.models && Array.isArray(this.models) && this.models.length > 0) {
      form = this.createGroup(form, this.models);
      if (this.tabLayout.length > 0) {
        this.tabLayout.push({components: this.models, title: this.textContainer.other}); // 其他类别
        this.blockInValid.push(0); // 初始化字段分组验证容器
      }
    } else {
      this.models = [];
    }
    this.complete = true; // 构建完毕

    return form;
  }

  createGroup(form, groups) {
    const models = [];

    /* 格式化表单布局配置 */
    groups = groups.map((block, i) => {
      if (block.items && Array.isArray(block.items)) {
        models.push(...block.items);
        block.items = this.sort(block.items); // 排序
      } else {
        block.items = [];
      }
      if (block.column) {
        block.column = [this.labelWidth(block.column), this.contentWidth(block.column)];
      }
      return block;
    });

    /* 构建表单 */
    models.forEach(model => form.addControl(model.name, this.builder.control(
      {value: model.value, disabled: model.disabled}, // 默认值
      this.fetchValidator(model),
    )));

    return form;
  }

  isBlockInvalid(i) {
    this.blockInValid[i] = 0;
    this.tabLayout[i].components.map((models) => {
      models.items.map(item => {
        if (this.form.controls[item.name].invalid) {
          this.blockInValid[i]++;
        }
      });
    });
    return this.blockInValid[i];
  }

  /**
   * 折叠表单内容
   */
  foldForm() {
    if (this.formFoldIcon === 'arrowhead-up') {
      /* 收起 */
      this.formFoldIcon = 'arrowhead-down';
      this.formExpand = false;
    } else {
      /* 展开 */
      this.formFoldIcon = 'arrowhead-up';
      this.formExpand = true;
    }
  }

  foldBlock(i) {
    this.models[i].hide = !this.models[i].hide;
  }

  /**
   * 表单提交
   */
  onSubmit() {
    this.formSubmit.emit(this.form.value); // 发送提交信息
  }

  /*
   * 重置表单
   */
  onReset() {
    this.form.reset();
    this.reload = (new Date()).getMilliseconds();
    this.formReset.emit(true);
  }

  /**
   * 其他按钮操作
   */
  onOperate(operation: FormButton) {
    this.formCustom.emit({ form: this.form.value, name: operation.name });
  }

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
   * 标签宽度
   * 可在初始化时确定
   */
  private labelWidth(column) {
    return column && this.validateColumn(column[0]) ? column[0] : 3;
  }

  /**
   * 内容宽度
   * 可在初始化时确定
   */
  private contentWidth(column) {
    return column && this.validateColumn(column[1]) ? column[1] : 9;
  }

  private validateColumn(column) {
    return column && !isNaN(column) && column > 0 && column <=12
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
