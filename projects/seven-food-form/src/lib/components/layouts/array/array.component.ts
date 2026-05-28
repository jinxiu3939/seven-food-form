import { Component, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { SfArrayModel, SfArrayLayoutType } from '../../../models/layouts/array.model';
import { SfControlModel } from '../../../models/controls/control.model';
import { SfFormService } from '../../../services/form.service';
import { SfControlComponent } from '../control/control.component';

@Component({
  selector: 'sf-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    SfControlComponent
  ]
})
export class SfArrayComponent {
  @Input() formArray!: FormArray;
  @Input() model!: SfArrayModel;

  constructor(private formService: SfFormService) {}

  get layout(): SfArrayLayoutType {
    return this.model.arrayLayout || 'list';
  }

  addItem(): void {
    if (this.model.models) {
      if (!this.model.maxItems || this.formArray.length < this.model.maxItems) {
        const newItem = this.formService.createFormGroupFromModels(this.model.models);
        this.formArray.push(newItem);
      }
    }
  }

  removeItem(index: number): void {
    if (!this.model.minItems || this.formArray.length > this.model.minItems) {
      this.formArray.removeAt(index);
    }
  }

  canAddItem(): boolean {
    return !this.model.maxItems || this.formArray.length < this.model.maxItems;
  }

  canRemoveItem(_index: number): boolean {
    return !this.model.minItems || this.formArray.length > this.model.minItems;
  }

  isControlModel(model: any): model is SfControlModel {
    return model.type !== 'group' && model.type !== 'array';
  }

  trackByIndex(index: number): number {
    return index;
  }
}
