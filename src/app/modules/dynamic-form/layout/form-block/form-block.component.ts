import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-form-block',
  templateUrl: './form-block.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class FormBlockComponent {
  @Input() models: BaseModel<any>[]; // 表单项
  @Input() form: FormGroup; // 响应式表单
  @Input() column: number[]; // 列宽度
  @Input() display: string = ''; // 样式
}
