/**
 * 关联外键选择
 */

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

import { deepExtend } from '../../helps';
import { ItemListModel } from '../../dynamic-form.options';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@Component({
  selector: 'ngx-item-list',
  templateUrl: `./item-list.component.html`,
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {

  @Input() form: FormGroup;
  @Input() model: ItemListModel;

  constructor(private service: NbDialogService) {
  }

  /*
   * 新增子项目
   */
  add() {
    this.service.open(ItemDialogComponent,
                      {
                        context: {
                          title: '新增' + this.model.label,
                          data: {},
                          fields: this.model.attributes,
                        },
                        closeOnBackdropClick: false,
                      }).onClose.subscribe(data => this.receive(data, false));
  }

  /*
   * 编辑子项目
   */
  edit(row, index) {
    const tmp_row = deepExtend({}, row);
    this.service.open(ItemDialogComponent,
                      {
                        context: {
                          data: tmp_row,
                          fields: this.model.attributes,
                          title: '编辑' + this.model.label,
                        },
                        closeOnBackdropClick: false,
                      }).onClose.subscribe(data => this.receive(data, index));
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
  private receive(result, index) {
    if (result) {
      if (index !== false) {
        this.model.value[index] = result; // 更新
      } else {
        this.model.value.push(result); // 新增
      }
      this.form.controls[this.model.name].setValue(this.model.value);
    }
  }
}
