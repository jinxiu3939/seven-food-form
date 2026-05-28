import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { SfGroupModel, SfLayoutType } from '../../../models/layouts/group.model';
import { SfControlModel } from '../../../models/controls/control.model';
import { SfArrayModel } from '../../../models/layouts/array.model';
import { SfArrayComponent } from '../array/array.component';
import { SfControlComponent } from '../control/control.component';
import { SfFormModel } from '../../..';

@Component({
  selector: 'sf-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTabsetModule,
    SfArrayComponent,
    SfControlComponent
  ]
})
export class SfGroupComponent {
  @Input() formGroup!: FormGroup;
  @Input() models: SfFormModel[] = [];
  @Input() layout: SfLayoutType = '';
  @Input() title?: string;

  private columns: number = 2;

  isGroupModel(model: any): model is SfGroupModel {
    return model.type === 'group';
  }

  isArrayModel(model: any): model is SfArrayModel {
    return model.type === 'array';
  }

  isControlModel(model: any): model is SfControlModel {
    return model.type !== 'group' && model.type !== 'array';
  }

  getGroupFormGroup(model: SfGroupModel): FormGroup {
    return this.formGroup.get(model.name) as FormGroup;
  }

  getArrayFormArray(model: SfArrayModel): FormArray {
    return this.formGroup.get(model.name) as FormArray;
  }

  getControlColumns(model: SfControlModel): number {
    return model.columns || this.columns;
  }

  getGroupLayout(model: SfGroupModel): SfLayoutType {
    return model.layout || '';
  }

  getTabGroups(): SfGroupModel[] {
    return this.models.filter(m => this.isGroupModel(m)) as SfGroupModel[];
  }

  getTabTitle(tabGroup: SfGroupModel): string {
    return tabGroup.title || tabGroup.name;
  }

  trackByTitle(_index: number, item: SfFormModel): string {
    return item.name;
  }
}
