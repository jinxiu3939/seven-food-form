import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { KeyValueItemModel, Option } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-key-value-dialog',
  templateUrl: `./key-value-dialog.component.html`,
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './key-value-dialog.component.scss',
  ],
})
export class KeyValueDialogComponent implements OnInit {
  @Input() data: {key: string, value: any}; // 值
  @Input() options: KeyValueItemModel[]; // 键值对配置列表
  @Input() size: string = ''; // 表单组件的尺寸

  @Output() public finish = new EventEmitter<object>(); // 提交
  
  private searchTerms = new Subject<{value: string, key: string}>(); // 检索对象
  files$: Observable<any[]>;
  searchOptions: Option<string | number>[][] = []; // 显示值
  objectKeys = Object.keys;
  column = [3, 9];
  lang: any;
  selectOption: KeyValueItemModel; // 当前选项

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (this.size === 'medium') {
      this.column = [4, 8];
    } else if (this.size === 'large') {
      this.column = [2, 10];
    }

    for (const f in this.options) {
      if (this.options[f].options) {
        const key = this.options[f].key;
        this.searchOptions[key] = this.options[f].options;
        if (key === this.data.key) {
          this.selectOption = this.options[f];
        }
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
  search(term: string): void {
    this.searchTerms.next({value: term, key: this.data.key});
  }

  switchKey() {
    this.options.map((v) => {
      if (v.key === this.data.key) {
        this.selectOption = v;
      }
    });
  }

  /**
   * 过滤结果
   */
  private filter(term: {value: string, key: string}): Observable<any[]> {
    let result: any[];
    const keyword = term.value;
    const key_value = this.options.find((row) => row.key === term.key);
    if (keyword) {
      result = key_value.options.filter((item) => {
        return item.text.indexOf(keyword) >= 0 || (item.value + '').indexOf(keyword) >= 0;
      });
    } else {
      result = key_value.options; // 默认显示全部
    }
    this.searchOptions[term.key] = result;
    return of(result);
  }

  show() {
    this.files$.subscribe();
  }
}
