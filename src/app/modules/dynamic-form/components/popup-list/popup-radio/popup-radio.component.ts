/**
 * 弹出式单选列表
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { PopupRadioModel, Option } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';
import { ComponentReset } from '../../../providers/interface/component-reset';

@Component({
  selector: 'sff-popup-radio',
  templateUrl: './popup-radio.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './popup-radio.component.scss',
  ],
})
export class PopupRadioComponent implements OnInit, ComponentReset {

  @Input() model: PopupRadioModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public text: string; // 显示内容
  public records: Option<string | number>[] = []; // 结果集
  private tmpRecords: Option<string | number>[][] = []; // 临时结果集
  private windowRef: NbWindowRef;
  private checked: Option<string | number>;
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

    this.text = this.model.text || '';
    this.loadChecked();
  }

  resetModel() {
    this.loadChecked();
  }

  loadChecked() {
    if (this.model.options) {
      const current = this.model.options.filter((item) => item.value === this.model.value);
      if (current.length > 0) {
        this.checked = current[0];
      }
    }
  }

  get label() {
    return this.model.value + ' / ' + (this.form.controls[this.model.name].value ? this.text : '');
  }

  /**
   * 选择
   */
  choose() {
    this.resetRecords(true);
    this.windowRef = this.windowService.open(this.contentTemplate, {
      title: this.lang.choose + ` - ` + this.model.label,
      windowClass: 'popup-list-window',
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
    this.pageTerms.next(Math.random());
  }

  /**
   * 下一页
   */
  nextPage() {
    this.pages$.subscribe(() => this.page++ );
  }

  search(records) {
    const index = this.page - 1;
    if (Array.isArray(records) && records.length > 0 && ! this.tmpRecords[index]) {
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
