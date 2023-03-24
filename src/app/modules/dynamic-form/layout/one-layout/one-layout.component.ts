import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel, FormSetting } from '../../dynamic-form.options';

@Component({
  selector: 'sff-one-layout',
  templateUrl: './one-layout.component.html',
  styleUrls: ['../../dynamic-form.component.scss'],
})
export class OneLayoutComponent implements OnChanges {
  @Input() models: BaseModel<any>[][]; // 表单项
  @Input() setting: FormSetting; // 配置
  @Input() form: FormGroup; // 响应式表单
  @Input() reload: number; // 重新加载


  blockInValid: number[] = []; // 表单块异常字段数量容器

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'groups' && changes[propName].currentValue) {
        this.setting.children.map((setting, i) => {
          this.blockInValid[i] = 0; // 初始化字段分组验证容器
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
    this.models[i].map(item => {
      if (this.form.controls[item.name].invalid) {
        this.blockInValid[i]++;
      }
    });
    return this.blockInValid[i];
  }

  /**
   * 分步骤表单是否校验通过
   * @param i 序号
   * @returns
   */
  isStepValid(i) {
    return { valid: !this.setting.validate || this.isBlockInvalid(i) === 0, reset: () => {} }
  }

  /**
   * 折叠表单快
   * @param i 序号
   */
  foldBlock(i) {
    this.setting.children[i].hideblockBody = !this.setting.children[i].hideblockBody;
  }
}
