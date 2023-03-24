import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButton } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'sff-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class FormButtonComponent implements OnInit {
  @Input() hideSubmit: boolean; // 是否隐藏提交表单
  @Input() hideReset: boolean; // 是否隐藏重置表单
  @Input() submitText: string; // 提交按钮名称
  @Input() resetText: string; // 重置按钮名称
  @Input() buttons: FormButton[]; // 自定义操作按钮
  @Input() validate: boolean; // 是否验证表单
  @Input() showFold: boolean; // 是否显示折叠按钮
  @Input() form: FormGroup; // 响应式表单
  @Input() align: string; // 按钮对齐方式

  @Output() public submit = new EventEmitter<any>(); // 提交事件
  @Output() public reset = new EventEmitter<number>(); // 重置事件
  @Output() public operate = new EventEmitter<string>(); // 自定义操作事件
  @Output() public fold = new EventEmitter<boolean>(); // 折叠事件

  lang: any; // 语言包
  foldIcon: string = 'arrowhead-up'; // 默认不折叠，显示折叠icon

  constructor(private langProvider: LangProvider) {
    this.lang = this.langProvider.lang; // 设置语言包
  }

  ngOnInit(): void {
    if (!this.submitText) {
      this.submitText = this.lang.submit;
    }
    if (!this.resetText) {
      this.resetText = this.lang.reset;
    }
    if (this.validate !== false) {
      this.validate = true; // 默认验证
    }
    if (this.showFold === true) {
      this.foldIcon = 'arrowhead-down'; // 折叠，显示展开icon
    }
  }

  /**
   * 表单提交
   */
  onSubmit() {
    this.submit.emit(true); // 发送提交信息
  }

  /*
    * 重置表单
    */
  onReset() {
    this.reset.emit((new Date()).getMilliseconds());
  }

  /**
   * 其他按钮操作
   */
  onOperate(operation: FormButton) {
    this.operate.emit(operation.name);
  }

  /**
   * 折叠表单内容
   */
  foldForm() {
    if (this.foldIcon === 'arrowhead-up') {
      /* 展开 */
      this.foldIcon = 'arrowhead-down';
      this.fold.emit(true);
    } else {
      /* 收起 */
      this.foldIcon = 'arrowhead-up';
      this.fold.emit(false);
    }
  }
}
