/**
 * 下拉框
 * 适用于选项不太多的单选
 * 与`RadioComponent`的区别是，下拉框适用于有空值或全部选项的场景
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RadioModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-drop-down-box',
  templateUrl: './drop-down-box.component.html',
})
export class DropDownBoxComponent {

  @Input() model: RadioModel;
  @Input() form: FormGroup;

  /*
   * 表单赋值
   * `nb-select`组件`selected`双向数据绑定
   */
  setValue() {
    this.form.controls[this.model.name].setValue(this.model.value);
  }

}
