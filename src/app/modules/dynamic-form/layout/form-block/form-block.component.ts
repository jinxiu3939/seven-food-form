import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel } from '../../dynamic-form.options';
import { formatWidth } from '../../helps';

@Component({
  selector: 'sff-form-block',
  templateUrl: './form-block.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class FormBlockComponent implements OnInit {
  @Input() models: BaseModel<any>[]; // 表单项
  @Input() form: FormGroup; // 响应式表单
  @Input() reload: number; // 重新加载
  @Input() size: string; // 一行放几个表单项 'large'(1个) | 'medium'(2个) | 'default'(3个) | 'small'(4个) | 'tiny'(5个)
  @Input() width: number; // 每个表单项中表单内容的宽度
  @Input() validate: boolean; // 是否校验表单

  labelWidth: number = 2; // 标签列宽

  ngOnInit(): void {
    if (this.width) {
      this.width = formatWidth(this.width);
      this.labelWidth = 12 - this.width;
    } else {
      this.width = 12 - this.labelWidth;
    }

    if (!this.size) {
      this.size = 'large';
    }
  }

  invalid(name) {
    const control = this.form.controls[name];
    return this.validate && control.invalid;
  }
}
