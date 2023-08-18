/**
 * 弹出式多选列表
 * min需配合required一起使用，未设置required时min不会生效，只有在值不为空的情况下min才会生效
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { formatAlertMessage } from '../../../helps';
import { PopupCheckboxModel, Option } from '../../../dynamic-form.options';
import { ComponentReset } from '../../../providers/interface/component-reset';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-popup-checkbox',
  templateUrl: './popup-checkbox.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './popup-checkbox.component.scss',
  ],
})
export class PopupCheckBoxComponent implements OnInit, ComponentReset {

  @Input() model: PopupCheckboxModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public text: any; // 显示内容
  public records: Option<string | number>[] = []; // 结果集
  private tmpRecords: Option<string | number>[][] = []; // 临时结果集
  private windowRef: NbWindowRef;
  private checked: Option<string | number>[]; // 选中的结果集
  private canceled: any[] = []; // 取消选中的值
  public page: number; // 列表分页
  lang: any;

  /* 分页流 */
  private pageTerms = new Subject<number>(); // 页码对象
  pages$: Observable<number>; // 可观察对象流
  
  constructor(private windowService: NbWindowService, private langProvider: LangProvider) {
    this.records = [];
    this.page = 1;
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    /* 分页流 */
    this.pageTerms.pipe(
      debounceTime(700),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term) => this.pages$ = of(term)), // 获取检索结果
    ).subscribe(() => this.nextPage()); // 下一页

    this.text = this.model.text;
    if (! this.model.value) {
      this.model.value = [];
    }
    this.loadChecked();
  }

  resetModel() {
    this.loadChecked(); // 加载选中项
    this.canceled = []; // 初始化取消项
  }

  /**
   * 加载选中项
   */
  loadChecked() {
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
      message.push(formatAlertMessage(this.lang.min_select, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.max_select, [this.model.max]));
    }
    return message;
  }

  /**
   * 选择
   */
  choose() {
    this.resetModel(); // 重置模型
    this.resetRecords(true); // 重置异步检索
    this.windowRef = this.windowService.open(this.contentTemplate, {
      title: this.lang.choose + ` - ` + this.model.label,
      windowClass: 'popup-list-window',
    });
  }

  /**
   * 清空
   */
  destroy() {
    this.model.value = [];
    this.form.controls[this.model.name].setValue(null); // 清空表单值
    this.checked = [];
    this.canceled = [];
  }

  /**
   * 删除
   */
  delete(val) {
    this.checked = this.checked.filter((item) => item.value !== val);
    this.model.value = this.model.value.filter((item) => item !== val);
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /**
   * 取消选择
   */
  cancel() {
    this.windowRef.close();
  }

  /**
   * 提交选择
   */
  submit() {
    if (this.checked) {
      this.checked.map(element => {
        if (! this.model.value.includes(element.value)) {
          this.model.value.push(element.value);
          this.text[element.value] = element.text;
        }
      });
    }
    if (this.canceled) {
      this.model.value = this.model.value.filter((item) => !this.canceled.includes(item));
    }
    this.form.controls[this.model.name].setValue(this.model.value);
    this.windowRef.close();
  }

  /**
   * 勾选记录
   * @param item 记录
   */
  selectedItem(item) {
    if (this.checked.includes(item)) { // 选中状态
      /* 取消勾选 */
      this.canceled.push(item.value);
      this.checked = this.checked.filter((i) => item !== i);
    } else { // 未选中状态
      /* 勾选 */
      this.checked.push(item);
      this.canceled = this.canceled.filter((i) => item.value !== i);
    }
  }

  /**
   * 加载更多
   */
   loadNext() {
    this.pageTerms.next(Math.random());
  }

  /**
   * 下一页
   */
  nextPage() {
    this.pages$.subscribe(() => this.page++ );
  }

  /**
   * 检索
   * @param records 检索记录
   */
  search(records) {
    const index = this.page - 1;
    if (Array.isArray(records) && records.length > 0 && ! this.tmpRecords[index]) {
      this.tmpRecords[index] = records;
      this.records.push(...records);
    }
  }

  /**
   * 重置异步检索
   * @param flag 
   */
  resetRecords(flag) {
    if (flag) {
      this.records = [];
      this.tmpRecords = [];
      this.page = 1;
    }
  }

}
