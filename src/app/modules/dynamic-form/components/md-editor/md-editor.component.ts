/**
 * `markdown-editor`富文本编辑器
 * depends on editor.md
 * 配置通用，一个表单中多个editor，配置会被覆盖
 * 工具栏设置固定会被头部遮挡，因此默认配置为工具栏不悬浮，编辑器高度固定，出现滚动条
 */
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { formatAlertMessage } from '../../helps';
import { MdEditorModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';
 
declare var editormd: any;

@Component({
  selector: 'sff-md-editor',
  templateUrl: `./md-editor.component.html`,
  styleUrls: [
    `./md-editor.component.scss`,
  ],
})
export class MarkDownEditorComponent implements OnInit, ComponentReset {
  @Input() model: MdEditorModel;
  @Input() form: FormGroup;
  @Input() reload: number; // 重新加载
 
  @ViewChild('editorContainer', { static: true }) editorContainer: ElementRef;

  lang: any;
  editor: any; // editormd编辑器
 
  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }
 
  ngOnInit() {
    /* 延迟显示等待editormd加载 */
    setTimeout(() => {
      this.editor = editormd(this.model.name, this.model.editorConfig); // 创建编辑器

      //  const textarea = this.editorContainer.nativeElement; // 获取textarea元素

      // 当编辑器内容改变时，触发textarea的change事件
      const $this = this;
      this.editor.on('change', function () {
        $this.syncModel($this.editor.getMarkdown()); // 设置markdown的值
        //  $this.syncModel(textarea.innerHTML); // 设置html值
      });
    }, 4000);
  }

  resetModel() {
  }
  
  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }
  
  get valid() {
    const control = this.form.controls[this.model.name];
    return control.value && control.valid;
  }
  
  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push(formatAlertMessage(this.lang.min_input, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.max_input, [this.model.max]));
    }
    return message;
  }
  
  syncModel(data) {
    this.model.value = data;
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }
}
  