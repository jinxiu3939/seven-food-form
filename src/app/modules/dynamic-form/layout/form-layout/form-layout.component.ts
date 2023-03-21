import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ModelGroup } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class FormLayoutComponent implements OnChanges {
  @Input() layout: string; // 布局
  @Input() groups: ModelGroup[]; // 表单项分组配置
  @Input() form: FormGroup; // 响应式表单
  @Input() reload: number; // 重新加载

  blockInValid: number[] = []; // 字段分组验证是否错误

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'groups' && changes[propName].currentValue) {
        this.groups.map((block, i) => {
          if (block.items && Array.isArray(block.items)) {
            this.blockInValid[i] = 0; // 初始化字段分组验证容器
          }
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
    this.groups[i].items.map(item => {
      if (this.form.controls[item.name].invalid) {
        this.blockInValid[i]++;
      }
    });
    return this.blockInValid[i];
  }

  /**
   * 折叠表单快
   * @param i 序号
   */
  foldBlock(i) {
    this.groups[i].hide = !this.groups[i].hide;
  }
}
