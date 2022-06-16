/**
 * 简单检索组件
 */
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
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
  selector: 'ngx-simple-search',
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

  /* 检索条件过滤 */
  private searchTerms = new Subject<{value: string, key: number}>(); // 检索对象
  files$: Observable<any[]>;
  searchOptions: Option<string | number>[][] = []; // 下拉框条件临时存储

  public condition: any = {}; // 检索条件
  public loading: boolean; // 数据加载标志位
  private current: number; // 当前页
  lang: any;

  constructor(private provider: SearchProvider, private langProvider: LangProvider) {
    this.loading = false;
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term) => this.files$ = this.filterConditionOption(term)), // 获取检索结果
    ).subscribe(() => this.showConditionOption()); // 显示检索结果
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'page' && changes[propName].currentValue) {
        if (this.current !== changes[propName].currentValue) {
          this.current = changes[propName].currentValue;
          this.finishSearch(); // 分页变化后，发起检索
        }
      } else if (propName === 'config') {
        this.config.conditions.forEach((cond, f) => {
          this.condition[cond.value] = null;
          this.searchOptions[f] = cond.options;
        }); // 检索条件初始化
        if (this.config.endpoint) {
          this.provider.setApi(this.config.endpoint);
        }
        this.finishSearch(); // 配置改变后，重新检索
      }
    }
  }

  /**
   * 检索
   */
  search(): void {
    this.page = 1;
    this.current = 1;
    this.reload.emit(true);
    this.finishSearch();
  }

  private finishSearch() {
    this.loading = true;
    this.getResult().pipe(
      // wait 500ms, 防止input参数变化之后的请求风暴
      debounceTime(500),
    ).subscribe((result) => {
      this.finish.emit(result);
      this.loading = false;
    });
  }

  /**
   * 获取结果集
   */
  private getResult(): Observable<Option<string| number>[]> {
    if (this.config.mode === 'async') {
      return this.fetch(); // 异步获取数据
    } else {
      return this.filter(); // 同步检索
    }
  }

  /**
   * 抓取异步结果集
   */
  private fetch(): Observable<Option<string| number>[]> {
    const param = deepExtend({}, this.config.additionalParameter, this.condition);
    this.provider.setApi(this.config.endpoint); // 重新设置检索接口
    return this.provider.getPage(this.page, this.config.size, param);
  }

  /**
   * 过滤同步结果集
   */
  private filter(): Observable<Option<string| number>[]> {
    let result: Option<string| number>[];
    result = this.items.filter((item) => {
      // 检索
      for (const i in this.condition) {
        if (this.condition[i]) {
          if (!item.title) {
            item.title = item.text;
          }
          if ((item.value + '').indexOf(this.condition[i]) < 0
            && item.text.indexOf(this.condition[i]) < 0
            && item.title.indexOf(this.condition[i]) < 0) {
            return false;
          }
        }
      }
      return true; // 默认显示全部
    }).slice((this.page - 1) * this.config.size, this.page * this.config.size); // 分页
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
      return this.provider.getPage(1, this.config.size, {title: keyword, format: 'option'}).pipe(
        map(res => this.searchOptions[term.key] = res),
      );
    } else { // 同步检索
      if (keyword) {
        result = this.config.conditions[term.key].options.filter((item) => {
          for (const i in item) {
            if (item.text.indexOf(keyword) >= 0 || (item.value+'').indexOf(keyword) >= 0) {
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
