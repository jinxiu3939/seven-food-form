/**
 * `u-editor`富文本编辑器
 * 请谨慎配置max，因为表单的maxlenght验证器和编辑器的maximumWords不一致
 * maximumWords统计去除了html标签的内容长度，而maxlenght统计所有字符串长度
 * 因此 maximumWords < max
 * 正确的做法是：设置maximumWords，而不是max 
 * depends on ueditor and ngx-ueditor module
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { formatAlertMessage } from '../../helps';
import { UEditorModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-u-editor',
  templateUrl: `./u-editor.component.html`,
  styleUrls: [
    `./u-editor.component.scss`,
  ],
})
export class BaiduUEditorComponent implements OnInit, ComponentReset {
  @Input() model: UEditorModel;
  @Input() form: FormGroup;

  loading = true;
  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    /* 延迟显示等待UE加载 */
    setTimeout(() => {
      this.loading = false;
    }, 5000);
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
 
  ready(data) {
    /* 设置请求参数 */
    if (this.model?.editorConfig?.token) {
      const ue = data.instance;
      ue.execCommand('serverparam', {
        token: this.model.editorConfig.token,
        'app-key': this.model.editorConfig['app-key'],
      });
    }
  }
 }
 