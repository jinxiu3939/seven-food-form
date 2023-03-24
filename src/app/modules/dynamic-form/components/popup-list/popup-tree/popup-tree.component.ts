import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  NbWindowService,
  NbWindowRef,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

import { TreeNode, Option, PopupTreeModel } from '../../../dynamic-form.options';
import { TreeProvider } from '../../../providers/data/tree-provider';
import { LangProvider } from '../../../providers/data/lang.provider';
import { ComponentReset } from '../../../providers/interface/component-reset';

@Component({
  selector: 'sff-popup-tree',
  templateUrl: './popup-tree.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './popup-tree.component.scss'
  ],
})
export class PopupTreeComponent implements OnInit, ComponentReset {

  @Input() model: PopupTreeModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public loading: boolean; // 数据加载标志位
  public customColumn = 'value';
  public defaultColumns = ['text', 'title', 'items'];
  public allColumns = [this.customColumn, ...this.defaultColumns];
  public dataSource: NbTreeGridDataSource<Option<string | number>>;
  public text: string; // 显示内容
  private data: TreeNode<Option<string | number>>[]; // 数据
  private selected: Option<string | number>; // 当前选择的节点
  private windowRef: NbWindowRef;
  lang: any;

  constructor(private windowService: NbWindowService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<Option<string | number>>,
              private langProvider: LangProvider,
              private provider: TreeProvider) {
    this.loading = false;
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.text = this.model.text;
  }

  resetModel() {
  }

  get label() {
    let text = this.model.value;
    if (this.text) {
      text +=  '/' + this.text
    }
    return text;
  }

  /**
   * 选择
   */
  choose() {
    this.fetchData();
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
    this.selected = null;
    this.model.value = null;
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  cancel() {
    this.windowRef.close();
  }

  submit() {
    if (this.selected) {
      this.model.value = this.selected.value;
      this.form.controls[this.model.name].setValue(this.model.value);
      this.text = this.selected.text;
    }
    this.windowRef.close();
  }

  private fetchData() {
    if (this.model.mode === 'async') { // 异步
      if (! this.data) {
        this.loading = true;
        if (this.model.endpoint) {
          this.provider.setApi(this.model.endpoint);
        }
        this.provider.getTree(this.model.searchParameter).subscribe(data => {
          this.data = data;
          this.loadData();
          this.loading = false;
        });
      }
    } else { // 同步
      this.data = this.model.tree;
      this.loadData();
    }
  }

  private loadData() {
    this.dataSource = this.dataSourceBuilder.create(this.data); // 加载数据
  }

  /**
   * 排序
   */
  filter(keyword) {
    this.dataSource.filter(keyword);
  }  

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  select(row) {
    this.selected = row.data;
  }

  isChecked(data) {
    if (this.selected) {
      return this.selected.value === data.value;
    } else {
      return this.model.value === data.value;
    }
  }
}
