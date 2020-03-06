/**
 * 弹出式单选列表
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { PopupRadioModel, Option } from '../../../dynamic-form.options';

@Component({
  selector: 'ngx-popup-radio',
  templateUrl: './popup-radio.component.html',
  styleUrls: [
    './popup-radio.component.scss',
  ],
})
export class PopupRadioComponent implements OnInit {

  @Input() model: PopupRadioModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public text: string; // 显示内容
  public records: Option<string | number>[] = []; // 结果集
  private tmpRecords: Option<string | number>[][] = []; // 临时结果集
  private windowRef: NbWindowRef;
  private checked: Option<string | number>;
  public page: number; // 列表分页

  constructor(private windowService: NbWindowService) {
    this.records = [];
    this.page = 1;
  }

  ngOnInit() {
    this.text = this.model.text;
    if (this.model.options) {
      const current = this.model.options.filter((item) => item.value === this.model.value);
      if (current.length > 0) {
        this.checked = current[0];
      }
    }
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
    this.text = '';
    this.model.value = null;
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  cancel() {
    this.windowRef.close();
  }

  submit() {
    if (this.checked) {
      this.model.value = this.checked.value;
      this.form.controls[this.model.name].setValue(this.model.value);
      this.text = this.checked.text;
    }
    this.windowRef.close();
  }

  selectedItem(item) {
    this.checked = item;
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
