import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { LinkageBoxTreeModel, LinkageOption } from '../../dynamic-form.options';
import { ComponentReset } from '../../providers/interface/component-reset';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'sff-linkage-box',
  templateUrl: './linkage-box.component.html',
  styleUrls: [
    '../../dynamic-form.component.scss',
  ],
})
export class LinkageBoxComponent implements OnInit, ComponentReset {

  @Input() form: FormGroup;
  @Input() model: LinkageBoxTreeModel;

  lang: any;
  private searchTerms = new Subject<string>(); // 检索条件对象
  files$: Observable<LinkageOption<string | number>[]>; // 可观察对象流
  searchOptions: LinkageOption<string | number>[] = []; // 过滤选项临时存储

  constructor(private langProvider: LangProvider) {
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
      switchMap((term) => this.files$ = this.filterFirstNodes(term)), // 获取检索结果
    ).subscribe(() => this.showNodes()); // 显示过滤结果

    /* 初始化选项树 */
    this.model.tree.options.map((option) => this.searchOptions.push(option));
  }

  resetModel() {
    if (this.model?.tree) {
      this.model.tree.selected = '';
    }
  }

  getValue(selected: any) {
    if (selected) {
      this.form.controls[this.model.name].setValue(selected); // 表单赋值
    }
  }

  filter(keyword: string) {
    this.searchTerms.next(keyword);
  }

  /**
   * 显示过滤结果
   */
  showNodes() {
    this.files$.subscribe();
  }

  /**
   * 过滤一级结点
   */
  private filterFirstNodes(keyword: string): Observable<LinkageOption<string | number>[]> {
    this.searchOptions = this.model.tree.options.filter((item) => {
      if (keyword) {
        for (const i in item) {
          if (
            item.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
            || (item.value+'').toLowerCase().indexOf(keyword.toLowerCase()) >= 0
          ) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    });

    return of(this.searchOptions);
  }
}
