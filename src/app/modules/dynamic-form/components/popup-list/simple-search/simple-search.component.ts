/**
 * 简单检索组件
 */
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import {
  Option,
  SearchConfig,
} from '../../../dynamic-form.options';
import { deepExtend } from '../../../helps';
import { SearchProvider } from '../../../providers/data/search-provider';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: [
    './simple-search.component.scss',
  ],
})
export class SimpleSearchComponent implements OnInit, OnChanges {

  @Input() config: SearchConfig; // 检索配置
  @Input() items: Option<string| number>[]; // 所有同步结果集
  @Input() page: number;

  @Output() public finish = new EventEmitter<Option<string| number>[]>(); // 检索完成
  @Output() public reload = new EventEmitter<boolean>(); // 重新检索

  /* 检索条件流 */
  private searchTerms = new Subject<{value: string, key: number}>(); // 检索条件对象
  files$: Observable<any[]>; // 可观察对象流
  searchOptions: Option<string | number>[][] = []; // 下拉框条件临时存储

  public condition: any = {}; // 检索条件
  public loading: boolean; // 数据加载标志位
  lang: any;

  constructor(private provider: SearchProvider, private langProvider: LangProvider) {
    this.loading = false;
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    /* 条件项检索流 */
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term) => this.files$ = this.filterConditionOption(term)), // 获取检索结果
    ).subscribe(() => this.showConditionOption()); // 显示检索结果

    this.config.conditions.forEach((cond, f) => {
      this.condition[cond.value] = null;
      this.searchOptions[f] = cond.options;
    }); // 检索条件初始化
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'page' && changes[propName].currentValue) {
        this.finishSearch(changes[propName].currentValue); // 分页变化后，发起检索
      } else if (propName === 'config') {
        this.provider.setApi(this.config.endpoint); // 设置检索接口
      }
    }
  }

  /**
   * 检索
   */
  search(): void {
    this.reload.emit(true);
    this.finishSearch(1);
  }

  private finishSearch(page: number) {
    this.loading = true;
    this.getResult(page).subscribe((result) => {
      this.finish.emit(result);
      this.loading = false;
    });
  }

  /**
   * 获取结果集
   */
  private getResult(page): Observable<Option<string| number>[]> {
    if (this.config.mode === 'async') {
      return this.fetch(page); // 异步获取数据
    } else {
      return this.filter(page); // 同步检索
    }
  }

  /**
   * 抓取异步结果集
   */
  private fetch(page: number): Observable<Option<string| number>[]> {
    const param = deepExtend({}, this.config.additionalParameter, this.condition);
    return this.provider.getPage(page, this.config.size, param);
  }

  /**
   * 过滤同步结果集
   */
  private filter(page: number): Observable<Option<string| number>[]> {
    let result: Option<string| number>[];
    result = this.items.filter((item) => {
      // 检索，同步结果集检索条件只有一个关键字
      for (const i in this.condition) {
        if (this.condition[i]) {
          /* 全部转换为小写进行检索 */
          if (
            item.value
            && (item.value + '').toLowerCase().indexOf(this.condition[i].toLowerCase()) >= 0
          ) {
            return true;
          } else if (item.text && (item.text + '').toLowerCase().indexOf(this.condition[i].toLowerCase()) >= 0) {
            return true;
          } else if (item.title && (item.title + '').toLowerCase().indexOf(this.condition[i].toLowerCase()) >= 0) {
            return true;
          } else if (item.items && (item.items + '').toLowerCase().indexOf(this.condition[i].toLowerCase()) >= 0) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true; // 默认显示全部
    }).slice((page - 1) * this.config.size, page * this.config.size); // 分页
    return of(result);
  }

  /**
   * 检索条件过滤
   */
  searchConditionOption(term: string, f): void {
    this.searchTerms.next({value: term, key: f});
  }

  /**
   * 检索条件过滤结果
   */
  private filterConditionOption(term: {value: string, key: number}): Observable<any[]> {
    let result: any[];
    const keyword = term.value;
    /* 获取结果 */
    if (this.config.conditions[term.key].mode === 'async') { // 异步检索
      this.provider.setApi(this.config.conditions[term.key].endpoint); // 设置检索接口
      return this.provider.getPage(1, this.config.conditions[term.key].size, {'associate_title': keyword, format: 'option'}).pipe(
        map(res => this.searchOptions[term.key] = res),
      );
    } else { // 同步检索
      if (keyword) {
        result = this.config.conditions[term.key].options.filter((item) => {
          for (const i in item) {
            if (
              item.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
              || (item.value+'').toLowerCase().indexOf(keyword.toLowerCase()) >= 0
            ) {
              return true;
            }
          }
          return false;
        });
      } else {
        result = this.config.conditions[term.key].options; // 默认显示全部
      }
      this.searchOptions[term.key] = result;
      return of(result);
    }
  }

  /**
   * 显示检索条件
   */
  showConditionOption() {
    this.files$.subscribe();
  }
}
