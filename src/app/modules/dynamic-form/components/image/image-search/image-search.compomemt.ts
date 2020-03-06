/**
 * 图片资源检索组件
 */
import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import {
  ImageItem,
  FileResource,
  ResourceSearchConfig,
  ResourceSearchConditions,
} from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers';

@Component({
  selector: 'ngx-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: [
    './image-search.component.scss',
  ],
})
export class ImageSearchComponent implements OnInit {

  @Input() config: ResourceSearchConfig;
  @Input() multiple: boolean;

  @Output() public finish = new EventEmitter<ImageItem>(); // 提交选择的图片

  @ViewChild('dialog', {static: false}) dialog;

  public conditions = ResourceSearchConditions; // 条件选项
  public condition: string; // 检索条件
  public keyword: string; // 检索关键字
  public loading: boolean; // 加载标志
  private finished = false; // 下拉加载是否已获取全部
  public message: string; // 提示信息
  private size: number; // 每页个数
  public page: number = 1; // 当前页码
  public pages: number = 1; // 总页码
  private total: number = 0; // 总数
  /* 数组由小到大依次如下 */
  public selected: number[]; // 选中的资源
  public records: FileResource[]; // 显示的资源，异步数据，records.length === files$.subscribe().length
  private files$: Observable<FileResource[]>; // 检索结果
  private items: FileResource[]; // 所有结果集
  private tmpItmes: FileResource[][]; // 异步检索临时结果集

  private searchTerms = new Subject<string>(); // 检索对象

  constructor(private provider: ResourceProvider, private dialogService: NbDialogService) {
    this.loading = false;
    this.message = '默认不显示图片，输入关键词之后显示检索结果';
  }

  ngOnInit() {
    if (this.config.mode === 'sync') {
      this.items = this.config.result; // 同步检索所有结果集
    } else {
      this.items = []; // 异步检索所有结果集动态增长
      this.tmpItmes = []; // 存放每次检索页码，防止重复结果集重复
    }
    this.size = this.config.additionalParameter.page_size;
    this.resetResult();
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.files$ = this.getResult(term)), // 获取检索结果
    ).subscribe(() => this.show()); // 显示检索结果
  }

  /**
   * 重置检索结果
   */
  private resetResult() {
    this.selected = [];
    this.page = 1;
    this.config.additionalParameter.page_number = 1;
  }

  /**
   * 切换检索条件
   */
  changeCondition(term: string): void {
    this.searchTerms.next(this.condition + '::' + term);
  }

  /**
   * 检索
   */
  search(term: string): void {
    this.searchTerms.next(this.condition + '::' + term);
  }

  /**
   * 获取结果集
   */
  private getResult(condition: string): Observable<FileResource[]> {
    this.resetResult();
    const keyword = condition.substr(condition.indexOf('::') + 2); // 检索关键字
    if (this.config.mode === 'async') {
      return this.fetch(keyword); // 异步获取数据
    } else {
      return this.filter(keyword); // 同步检索
    }
  }

  /**
   * 抓取异步结果集
   */
  private fetch(keyword: string): Observable<FileResource[]> {
    this.loading = true;
    /* 检索条件赋值 */
    this.config.additionalParameter.page_number = this.page; // 当前页码
    if (this.condition) {
      this.config.additionalParameter[this.condition] = keyword; // 检索指定条件
    } else {
      this.conditions.forEach((condition) => {
        this.config.additionalParameter[condition.value] = keyword; // 检索所有，接口检索关键字关系为或
      });
    }
    /* 构造检索参数 */
    return this.provider.getSearchResult(this.config.additionalParameter)
      .pipe(
        map((tempRes) => {
          let result: FileResource[] = [];
          if (tempRes.error) {
            this.message = tempRes.error;
          } else {
            this.last = tempRes.total; // 设置分页
            this.tmpItmes[this.page] = tempRes.list; // 临时结果集
            result = tempRes.list; // 本次检索结果
          }
          this.loading = false;
          return result;
        }),
      );
  }

  /**
   * 过滤同步结果集
   */
  private filter(keyword: string): Observable<FileResource[]> {
    let result: FileResource[];
    if (keyword) {
      result = this.items.filter((item) => {
        if (this.condition) { // 按照条件检索
          if (item[this.condition] instanceof String || Array.isArray(item[this.condition])) {
            if (item[this.condition].indexOf(keyword) >= 0) {
              return true;
            }
          }
        } else { // 检索所有条件
          for (const i in item) {
            if (item[i] instanceof String || Array.isArray(item[i])) {
              if (item[i].indexOf(keyword) >= 0) {
                return true;
              }
            }
          }
        }
        return false;
      });
    } else {
      result = this.items; // 默认显示全部
    }
    this.last = result.length; // 设置分页
    return of(result);
  }

  /**
   * 提交
   */
  save() {
    this.selected.forEach((index) => {
      const result = {url: this.items[index].url, title: this.items[index].title};
      this.finish.emit(result);
    });
  }

  /**
   * 选择
   */
  choose(id: number) {
    if (this.selected.indexOf(id) >= 0) {
      this.cancel(id);
    } else {
      this.select(id);
    }
  }

  /**
   * 选中
   */
  private select(file: number) {
    if (this.multiple) { // 多选
      if (this.config.queueLimit) { // 限制个数
        if (this.selected.length < this.config.queueLimit) {
          this.selected.push(file);
        } else {
          this.alert('最多选择' + this.config.queueLimit + '张图片');
        }
      } else { // 不限个数
        this.selected.push(file);
      }
    } else { // 单选
      this.selected = [file];
    }
  }

  /**
   * 取消
   */
  private cancel(file: number) {
    this.selected = this.selected.filter((k) => k !== file);
  }

  /**
   * 显示每次检索之后的图片
   */
  show() {
    if (this.config.display === 'page') { // 分页
      this.paginate();
    } else { // 下拉加载更多
      this.infiniteList();
    }
  }

  /**
   * 设置分页
   */
  set last(total: number) {
    this.total = total; // 结果总数
    this.pages = Math.ceil(this.total / this.size); // 总页数
    if (total === 0) {
      this.message = '暂无图片，更换关键词试一下';
    } else {
      this.message = '加载中...';
    }
  }

  /**
   * 异步全部检索结果
   */
  private asyncItems() {
    this.tmpItmes.forEach((result) => this.items.push(...result));
  }

  /**
   * 下拉加载
   */
  private infiniteList() {
    this.files$.subscribe((result) => {
      let current: FileResource[];
      if (this.config.mode === 'async') {
        current = this.syncMore(result); // 同步分页
      } else {
        current = result; // 异步结果即为当前页
      }
      this.records = current;
      this.page ++;
    });
  }

  /**
   * 下拉加载更多
   */
  loadNext() {
    if (this.loading || this.finished) { return; } // 全部加载完毕
    if (this.page === 1) {
      return;
    }
    if (this.config.mode === 'async') { // 异步
      this.fetch(this.keyword).subscribe(records => {
        if (records.length > 0) {
          this.records.push(...records); // 当前结果集
          this.asyncItems();
          this.page ++;
        } else {
          this.finished = true;
        }
      });
    } else { // 同步
      this.files$.subscribe((result) => {
        const more = this.syncMore(result);
        if (more.length > 0) {
          this.records.push(...more); // 追加结果集
          this.page ++;
        } else {
          this.finished = true;
        }
      });
    }
  }

  /**
   * 同步结果分页
   */
  private syncMore(result) {
    return result.slice((this.page - 1) * this.size, this.page * this.size);
  }

  /**
   * 分页
   */
  private paginate() {
    if (this.config.mode === 'async') { // 异步
      this.files$.subscribe((result) => {
        this.records = result; // 当前图片
        this.asyncItems(); // 全部图片
      }); // 异步检索结果即为当前显示的图片
    } else { // 同步
      this.files$.subscribe((result) => this.records = this.syncMore(result));
    }
  }

  /**
   * 前一页
   */
  prev() {
    this.page--;
    if (this.page < 1) {
      this.page = this.pages;
    }
    this.paginate();
  }

  /**
   * 后一页
   */
  next() {
    this.page++;
    if (this.page > this.pages) {
      this.page = 1;
    }
    this.paginate();
  }

  private alert(messge: string) {
    this.dialogService.open(this.dialog, { context: messge });
  }

}
