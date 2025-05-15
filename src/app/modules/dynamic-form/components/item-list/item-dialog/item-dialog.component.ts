import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ConditionField, Option } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-item-dialog',
  templateUrl: `./item-dialog.component.html`,
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './item-dialog.component.scss'
  ],
})
export class ItemDialogComponent implements OnInit {
  @Input() data: object; // 子项默认值
  @Input() fields: ConditionField[]; // 字段
  @Input() size: string = ''; // 表单组件的尺寸

  @Output() public finish = new EventEmitter<object>(); // 提交
  
  private searchTerms = new Subject<{value: string, key: number}>(); // 检索对象
  files$: Observable<any[]>;
  searchOptions: Option<string | number>[][] = [];
  column = [3, 9];
  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (this.size === 'medium') {
      this.column = [4, 8];
    } else if (this.size === 'large') {
      this.column = [2, 10];
    }

    for (const f in this.fields) {
      if (this.fields[f].options) {
        this.searchOptions[f] = this.fields[f].options;
      }
    }
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term) => this.files$ = this.filter(term)), // 获取检索结果
    ).subscribe(() => this.show()); // 显示检索结果
  }

  close() {
    this.finish.emit(null);
  }

  submit() {
    this.finish.emit(this.data);
  }

  /**
   * 检索
   * @param term 关键字
   * @param f 字段索引
   */
  search(term: string, f: number): void {
    this.searchTerms.next({value: term, key: f});
  }

  /**
   * 过滤结果
   */
  private filter(term: {value: string, key: number}): Observable<any[]> {
    let result: any[];
    const keyword = term.value;
    if (keyword) {
      result = this.fields[term.key].options.filter((item) => {
        return item.text.indexOf(keyword) >= 0 || (item.value + '').indexOf(keyword) >= 0;
      });
    } else {
      result = this.fields[term.key].options; // 默认显示全部
    }
    this.searchOptions[term.key] = result;
    return of(result);
  }

  show() {
    this.files$.subscribe();
  }
}
