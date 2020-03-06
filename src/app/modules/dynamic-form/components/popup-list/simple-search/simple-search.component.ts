/**
 * 简单检索组件
 */
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  Option,
  SearchConfig,
} from '../../../dynamic-form.options';
import { SearchProvider } from '../../../providers';

@Component({
  selector: 'ngx-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: [
    './simple-search.component.scss',
  ],
})
export class SimpleSearchComponent implements OnInit, OnChanges {

  @Input() config: SearchConfig; // 异步检索配置
  @Input() items: Option<string| number>[]; // 所有同步结果集
  @Input() page: number;

  @Output() public finish = new EventEmitter<Option<string| number>[]>(); // 检索完成
  @Output() public reload = new EventEmitter<boolean>(); // 重新检索

  public condition: any = {}; // 检索条件
  public loading: boolean; // 数据加载标志位
  private current: number; // 当前页

  constructor(private provider: SearchProvider) {
    this.loading = false;
  }

  ngOnInit() {
    this.config.conditions.forEach((cond) => this.condition[cond.value] = null);
    if (this.config.endpoint) {
      this.provider.setApi(this.config.endpoint);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'page' && changes[propName].currentValue) {
        if (this.current !== changes[propName].currentValue) {
          this.current = changes[propName].currentValue;
          this.finishSearch(); // 分页变化后，发起检索
        }
      }
    }
  }

  /**
   * 检索
   */
  search(): void {
    this.page = 1;
    this.reload.emit(true);
    this.finishSearch();
  }

  private finishSearch() {
    this.loading = true;
    this.getResult().subscribe((result) => {
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
    return this.provider.getPage(this.page, this.config.size, this.condition);
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

}
