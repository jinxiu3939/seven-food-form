import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { ConditionField } from '../../../dynamic-form.options';

@Component({
  templateUrl: `./item-dialog.component.html`,
  styleUrls: ['../../../dynamic-form.component.scss'],
})
export class ItemDialogComponent {
  title: string; // 标题
  data: object; // 子项默认值
  fields: ConditionField[]; // 字段

  constructor(public dialogRef: NbDialogRef<ItemDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.data);
  }
}
