import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbButtonModule } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SfGroupModel } from '../../models/layouts/group.model';
import { SfFormConfig, SfControlEvent } from '../../models/form.model';
import { SfFormService } from '../../services/form.service';
import { SfGroupComponent } from '../layouts/group/group.component';

@Component({
  selector: 'sf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    SfGroupComponent
  ]
})
export class SfFormComponent implements OnInit, OnDestroy {
  @Input() model!: SfGroupModel;
  @Input() config?: SfFormConfig;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<SfControlEvent>();

  formGroup!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private formService: SfFormService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.formGroup = this.formService.createFormGroupFromModel(this.model);
  }

  private setupValueChanges(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.emitChangeEvents();
      });
  }

  private emitChangeEvents(): void {
    this.traverseAndEmitChanges(this.formGroup, '');
  }

  private traverseAndEmitChanges(formGroup: FormGroup, parentKey: string): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (control instanceof FormGroup) {
        this.traverseAndEmitChanges(control, fullKey);
      } else if (control instanceof FormArray) {
        this.traverseAndEmitChangesArray(control, fullKey);
      } else {
        this.formChange.emit({
          type: 'change',
          key: fullKey,
          value: control?.value
        });
      }
    });
  }

  private traverseAndEmitChangesArray(formArray: FormArray, parentKey: string): void {
    formArray.controls.forEach((control, index) => {
      const arrayKey = `${parentKey}[${index}]`;
      if (control instanceof FormGroup) {
        this.traverseAndEmitChanges(control, arrayKey);
      } else {
        this.formChange.emit({
          type: 'change',
          key: arrayKey,
          value: control?.value
        });
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formService.getFormValue(this.formGroup);
      this.formSubmit.emit(formValue);
    } else {
      this.markAllAsTouched();
    }
  }

  onReset(): void {
    // 先触发表单重置
    this.formGroup.reset();

    // 触发自定义控件的重置逻辑
    this.formService.triggerControlReset(this.formGroup);

    // 发出重置事件
    this.formReset.emit();
  }

  private markAllAsTouched(): void {
    this.markGroupAsTouched(this.formGroup);
  }

  private markGroupAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markGroupAsTouched(control);
      } else if (control instanceof FormArray) {
        this.markArrayAsTouched(control);
      }
    });
  }

  private markArrayAsTouched(formArray: FormArray): void {
    formArray.controls.forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markGroupAsTouched(control);
      }
    });
  }

  get submitButtonText(): string {
    return this.config?.submitButtonText || '提交';
  }

  get resetButtonText(): string {
    return this.config?.resetButtonText || '重置';
  }

  get showReset(): boolean {
    return this.config?.showReset !== false;
  }

  get formTitle(): string {
    return this.model.title || '';
  }
}
