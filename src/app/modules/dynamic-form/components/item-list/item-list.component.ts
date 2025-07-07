/**
 * 子项目选择
 */
import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { deepExtend, formatAlertMessage } from '../../helps';
import { ItemListModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-item-list',
  templateUrl: `./item-list.component.html`,
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements ComponentReset, OnInit {

  @Input() form: FormGroup;
  @Input() model: ItemListModel;

  lang: any;
  searchAttribute: string; // 检索属性
  searchResult: any[] = []; // 检索结果
  sortDirection: number; // 排序方向
  sortType: string; // 排序类型
  keyword: string; // 检索条件

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  private windowRef: NbWindowRef;

  constructor(private service: NbWindowService, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  resetModel() {
  }

  ngOnInit(): void {
      this.searchResult = this.model.value;
      this.model.attributes.forEach(attribute => this.searchAttribute = attribute.value);
  }

  /*
   * 新增子项目
   */
  add() {
    this.windowRef = this.service.open(this.contentTemplate, { title: this.lang.add + ' - ' + this.model.label, context: {
      row: {},
      fields: this.model.attributes,
      size: this.model.size,
      index: false,
      keyValues: this.model.keyValue,
    }, closeOnBackdropClick: false,});
  }

  /*
   * 编辑子项目
   */
  edit(row, index) {
    const tmp_row = deepExtend({}, row); // 深度拷贝
    this.windowRef = this.service.open(this.contentTemplate, { title: this.lang.edit + ' - ' + this.model.label, context: {
        row: tmp_row,
        fields: this.model.attributes,
        size: this.model.size,
        index,
        keyValues: this.model.keyValue,
      },
      closeOnBackdropClick: false,
    });
  }

  /*
   * 删除子项目
   */
  delete(row) {
    this.model.value = this.model.value.filter(r => r !== row);
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /**
   * 排序
   * @param order 排序字段
   * @param direction 排序方向
   * @param type 排序类型
   */
  sort(order, direction, type) {
    if (type === 'number') {
      if (direction === 1) { // 升序
        this.model.value.sort((a, b) => +a[order] - +b[order]);
      } else { // 降序
        this.model.value.sort((a, b) => +b[order] - +a[order]);
      }
    } else if (type === 'datetime' || type === 'date') {
      if (direction === 1) { // 升序
        this.model.value.sort((a, b) => new Date(a[order]).getTime() - new Date(b[order]).getTime());
      } else { // 降序
        this.model.value.sort((a, b) => new Date(b[order]).getTime() - new Date(a[order]).getTime());
      }
    } else { // 字符串
      if (direction === 1) { // 升序
        this.model.value.sort((a, b) => (a[order]+'').localeCompare(b[order]+''));
      } else { // 降序
        this.model.value.sort((a, b) => (a[order]+'').localeCompare(b[order]+'')).reverse();
      }
    }
    this.doSearch(); // 重新检索
    this.sortDirection = direction; // 排序方向
    this.sortType = order; // 排序类型
    this.form.controls[this.model.name].setValue(this.model.value);
  }

  /*
   * 接收窗体返回值
   */
  receive(result, index) {
    if (result) {
      if (index !== false) {
        this.model.value[index] = result; // 更新
      } else {
        this.model.value.push(result); // 新增
      }
      this.searchResult = this.model.value; // 重置结果
      this.form.controls[this.model.name].setValue(this.model.value);
    }
    this.windowRef.close(); // 关闭弹窗
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }

  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push(formatAlertMessage(this.lang.input_down, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.input_up, [this.model.max]));
    }
    return message;
  }

  /**
   * 检索
   */
  search(keyword: string) {
    this.keyword = keyword;
    this.doSearch();
  }

  private doSearch() {
    if (this.keyword !== undefined) {
      this.searchResult = this.model.value.filter(r => (r[this.searchAttribute]+'').indexOf(this.keyword) > -1);
    }
  }
}
