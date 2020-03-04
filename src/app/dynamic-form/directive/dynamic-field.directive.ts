import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel } from '../dynamic-form.options';

import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CheckboxTreeComponent } from '../components/checkbox-tree/checkbox-tree.component';
import { CKEditorComponent } from '../components/ck-editor/ck-editor.component';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';
import { DropDownBoxComponent } from '../components/drop-down-box/drop-down-box.component';
import { ImageComponent } from '../components/image/image.component';
import { PopupRadioComponent } from '../components/popup-list/popup-radio/popup-radio.component';
import { RadioComponent } from '../components/radio/radio.component';
import { SpreadsheetComponent } from '../components/spreadsheet/spreadsheet.component';
import { TextAreaComponent } from '../components/text-area/text-area.component';
import { TextBoxComponent } from '../components/text-box/text-box.component';
import { PopupCheckBoxComponent } from '../components/popup-list/popup-checkbox/popup-checkbox.component';
import { PopupTreeComponent } from '../components/popup-list/popup-tree/popup-tree.component';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { PasswordBoxComponent } from '../components/password-box/password-box.component';

// 组件集合
export const COMPONENTS = {
  checkbox: CheckboxComponent,
  'checkbox-tree': CheckboxTreeComponent,
  'ck-editor': CKEditorComponent,
  'date-picker': DatePickerComponent,
  'drop-down-box': DropDownBoxComponent,
  image: ImageComponent,
  'item-list': ItemListComponent,
  'password-box': PasswordBoxComponent,
  'popup-checkbox': PopupCheckBoxComponent,
  'popup-radio': PopupRadioComponent,
  'popup-tree': PopupTreeComponent,
  radio: RadioComponent,
  'spreadsheet': SpreadsheetComponent,
  'text-area': TextAreaComponent,
  'text-box': TextBoxComponent,
};

@Directive({
  selector: '[ngxDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input() model: BaseModel<any>; // 表单项
  @Input() form: FormGroup; // 表单

  component: any;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit() {
    const component = COMPONENTS[this.model.type];
    if (component) {
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory); // 创建组件
      this.component.instance.model = this.model;
      this.component.instance.form = this.form;
    }
  }
}
