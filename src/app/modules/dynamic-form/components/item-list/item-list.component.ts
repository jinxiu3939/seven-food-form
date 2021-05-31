/**
 * 子项目选择
 */
import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { deepExtend } from '../../helps';
import { ItemListModel } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'ngx-item-list',
  templateUrl: `./item-list.component.html`,
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {

  @Input() form: FormGroup;
  @Input() model: ItemListModel;

  lang: any;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  private windowRef: NbWindowRef;

  constructor(private service: NbWindowService, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  /*
   * 新增子项目
   */
  add() {
    this.windowRef = this.service.open(this.contentTemplate, { title: this.lang.add + ' - ' + this.model.label, context: {
      row: {},
      fields: this.model.attributes,
      index: false,
    }, closeOnBackdropClick: false,});
  }

  /*
   * 编辑子项目
   */
  edit(row, index) {
    const tmp_row = deepExtend({}, row);
    this.windowRef = this.service.open(this.contentTemplate, { title: this.lang.edit + ' - ' + this.model.label, context: {
        row: tmp_row,
        fields: this.model.attributes,
        index,
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
   */
  sort(order, direction) {
    if (direction === 1) { // 升序
      this.model.value = this.model.value.sort((a, b) => +a[order] - +b[order]);
    } else { // 降序
      this.model.value = this.model.value.sort((a, b) => +b[order] - +a[order]);
    }
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
      this.form.controls[this.model.name].setValue(this.model.value);
    }
    this.windowRef.close(); // 关闭弹窗
  }
}
