import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbTooltipModule } from '@nebular/theme';
import { SfControlModel } from '../../../models/controls/control.model';
import { SfControlCreatorDirective } from '../../../directives/control-creator.directive';

@Component({
  selector: 'sf-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbIconModule,
    NbTooltipModule,
    SfControlCreatorDirective
  ]
})
export class SfControlComponent {
  @Input() control!: AbstractControl | null;
  @Input() model!: SfControlModel;

  getErrorMessage(): string {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return '';
    }

    const errors = this.control.errors;
    const errorMessages = this.model.errorMessages || {
      required: `${this.model.label || this.model.name} 为必填项`,
      email: '请输入有效的邮箱地址',
      minlength: `${this.model.label || this.model.name} 长度不足`,
      maxlength: `${this.model.label || this.model.name} 长度超出限制`,
      pattern: `${this.model.label || this.model.name} 格式不正确`
    };

    for (const errorKey in errors) {
      if (errorMessages[errorKey]) {
        return errorMessages[errorKey];
      }
    }

    return `${this.model.label || this.model.name} 无效`;
  }

  hasError(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }
}
