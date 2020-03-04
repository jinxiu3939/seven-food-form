/**
 * 弹出式多选列表
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { PopupCheckboxModel, Option } from '../../../dynamic-form.options';

@Component({
  selector: 'ngx-popup-checkbox',
  templateUrl: './popup-checkbox.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './popup-checkbox.component.scss',
  ],
})
export class PopupCheckBoxComponent implements OnInit {

  @Input() model: PopupCheckboxModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public text: string[]; // 显示内容
  public records: Option<string | number>[] = []; // 结果集
  private tmpRecords: Option<string | number>[][] = []; // 临时结果集
  private windowRef: NbWindowRef;
  private checked: Option<string | number>[];
  private page: number; // 列表分页

  constructor(private windowService: NbWindowService) {
    this.records = [];
    this.page = 1;
  }

  ngOnInit() {
    this.text = this.model.text;
    if (this.model.options) {
      this.checked = this.model.options.filter((item) => this.model.value.includes(item.value));
    }
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }

  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push('最少选择' + this.model.min + '项');
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push('最多选择' + this.model.max + '项');
    }
    return message;
  }

  /**
   * 选择
   */
  choose() {
    this.windowRef = this.windowService.open(this.contentTemplate, {
      title: `选择` + this.model.label,
    });
  }

  /**
   * 清空
   */
  destroy() {
    this.text = [];
    this.model.value = [];
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  /**
   * 删除
   */
  delete(val) {
    this.checked = this.checked.filter((item) => item.value !== val);
    this.model.value = this.model.value.filter((item) => item !== val);
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  cancel() {
    this.windowRef.close();
  }

  submit() {
    if (this.checked) {
      this.checked.forEach(element => {
        if (! this.model.value.includes(element.value)) {
          this.model.value.push(element.value);
          this.text.push(element.text);
        }
      });
      this.form.controls[this.model.name].setValue(this.model.value);
    }
    this.windowRef.close();
  }

  selectedItem(item) {
    this.checked.push(item);
  }

  /**
   * 加载更多
   */
  loadNext() {
    this.page ++;
  }

  search(records) {
    const index = this.page - 1;
    if (Array.isArray(records) && ! this.tmpRecords[index]) {
      this.tmpRecords[index] = records;
      this.records.push(...records);
    }
  }

  resetRecords(flag) {
    if (flag) {
      this.records = [];
      this.tmpRecords = [];
      this.page = 1;
    }
  }

}
