import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ConditionField, Option } from '../../../dynamic-form.options';

@Component({
  selector: 'ngx-item-dialog',
  templateUrl: `./item-dialog.component.html`,
  styleUrls: ['../../../dynamic-form.component.scss'],
})
export class ItemDialogComponent implements OnInit {
  @Input() data: object; // 子项默认值
  @Input() fields: ConditionField[]; // 字段

  @Output() public finish = new EventEmitter<object>(); // 提交
  
  private searchTerms = new Subject<{value: string, key: number}>(); // 检索对象
  files$: Observable<any[]>;
  searchOptions: Option<string | number>[][] = [];

  ngOnInit() {
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
   */
  search(term: string, f): void {
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
        for (const i in item) {
          if (item.text.indexOf(keyword) >= 0 || (item.value + '').indexOf(keyword) >= 0) {
            return true;
          }
        }
        return false;
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
