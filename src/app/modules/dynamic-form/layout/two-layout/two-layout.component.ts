import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel, FormSetting } from '../../dynamic-form.options';

@Component({
  selector: 'sff-two-layout',
  templateUrl: './two-layout.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class TwoLayoutComponent implements OnChanges {
  @Input() models: BaseModel<any>[][][]; // 表单项
  @Input() setting: FormSetting; // 配置
  @Input() form: FormGroup; // 响应式表单
  @Input() reload: number; // 重新加载

  blockInValid: number[] = []; // 表单块异常字段数量容器

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'models' && changes[propName].currentValue) {
        this.models.map((_, i) => {
          this.blockInValid[i] = 0; // 初始化表单块异常字段数量容器
        });
      }
    }
  }

  /**
   * 表单块异常字段数量
   * @param i 序号
   * @returns
   */
  isBlockInvalid(i) {
    this.blockInValid[i] = 0;
    this.models[i].map((top) => {
      top.map((model) => {
        if (this.form.controls[model.name]?.invalid) {
          this.blockInValid[i]++;
        }
      });
    });
    return this.blockInValid[i];
  }
}
