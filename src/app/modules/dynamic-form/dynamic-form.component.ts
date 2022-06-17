import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseModel, FormButton, ModelGroup, VALIDATORS } from './dynamic-form.options';
import { LANG } from './lang/lang.const';
import { LangProvider } from './providers/data/lang.provider';

@Component({
  selector: 'ngx-dynamic-form',
  styleUrls: ['./dynamic-form.component.scss'],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input() models: ModelGroup[]; // 表单布局配置
  @Input() loading: boolean; // 表单状态
  @Input() layout: string; // 布局
  @Input() buttons: FormButton[]; // 自定义操作按钮
  @Input() lang: string = 'zh'; // 语言包代码
  @Input() defaultButton = true; // 是否使用默认按钮
  @Input() searchButton = false; // 是否使用检索按钮

  @Output() public formSubmit = new EventEmitter<any>(); // 表单提交事件
  @Output() public formReset = new EventEmitter<boolean>(); // 表单重置事件
  @Output() public formCustom = new EventEmitter<any>(); // 其他点击事件

  form: FormGroup; // 响应式表单
  complete: boolean; // 表单是否构建完毕
  textContainer: any; // 语言包
  reload: number; // 重新加载时间戳

  constructor(private builder: FormBuilder, private langProvider: LangProvider) {
    this.textContainer = this.langProvider.lang; // 设置语言包
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'models' && changes[propName].currentValue) {
        this.complete = false; // 开始构建
        this.form = this.createGroup(); // 重新构造表单
        this.complete = true; // 构建完毕
      } else if (propName === 'lang' && changes[propName].currentValue) {
        const key = changes[propName].currentValue;
        if (LANG[key]) {
          this.textContainer = LANG[key];
        } else {
          this.textContainer = LANG.en;
        }
        this.langProvider.lang = this.textContainer; // 设置语言包
      }
    }
  }

  createGroup() {
    const group = this.builder.group({});
    if (this.models) {
      const models = [];
      if (Array.isArray(this.models)) {
        /* 格式化表单布局 */
        this.models = this.models.map(block => {
          if (block.items && Array.isArray(block.items)) {
            models.push(...block.items);
            block.items = this.sort(block.items); // 排序
          } else {
            block.items = [];
          }
          block.column = [this.labelWidth(block.column), this.contentWidth(block.column)];
          return block;
        });
      } else {
        this.models = [];
      }
      /* 构建表单 */
      models.forEach(model => group.addControl(model.name, this.builder.control(
        {value: model.value, disabled: model.disabled}, // 默认值
        this.fetchValidator(model),
      )));
    }
    return group;
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
    if (model.require) {
      validator.push(Validators.required);
    }
    if (model.min) {
      validator.push(Validators.minLength(model.min));
    }
    if (model.max) {
      validator.push(Validators.maxLength(model.max));
    }
    if (model.validator && VALIDATORS[model.validator]) {
      validator.push(VALIDATORS[model.validator]());
    }
    return validator;
  }
}
