import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbDatepickerModule,
  NbRadioModule,
  NbCardModule,
  NbCheckboxModule,
  NbListModule,
  NbIconModule,
  NbButtonModule,
  NbAlertModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbSelectModule,
  NbTabsetModule,
  NbCalendarModule,
  NbActionsModule,
  NbProgressBarModule,
  NbTreeGridModule,
  NbStepperModule,
} from '@nebular/theme';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { DynamicFormComponent } from './dynamic-form.component';
import { ResourceProvider, SearchProvider, TreeProvider } from './dynamic-form.options';
import { DemoResourceProvider } from './providers/demo/resource.provider';
import { DemoSimpleSearchProvider } from './providers/demo/simple-search.provider';
import { DemoTreeSearchProvider } from './providers/demo/tree-search.provider';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputEqualValidatorDirective } from './directive/input-equal-validator.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FormBlockComponent } from './layout/form-block/form-block.component';
import {
  CheckboxComponent,
  CheckboxNodeComponent,
  CheckboxTreeComponent,
  CKEditorComponent,
  DatePickerComponent,
  DropDownBoxComponent,
  ImageComponent,
  ImageCacheComponent,
  ImageSearchComponent,
  ImageSliderComponent,
  ImageUploadComponent,
  ImageWebComponent,
  ItemDialogComponent,
  ItemListComponent,
  PasswordBoxComponent,
  PopupCheckBoxComponent,
  PopupRadioComponent,
  PopupTreeComponent,
  SimpleSearchComponent,
  TreeNodeIconComponent,
  RadioComponent,
  SpreadsheetComponent,
  TextAreaComponent,
  TextBoxComponent,
} from './components';

const ENTRY_COMPONENTS = [
  CheckboxComponent,
  CheckboxNodeComponent,
  CheckboxTreeComponent,
  CKEditorComponent,
  DatePickerComponent,
  DropDownBoxComponent,
  ImageComponent,
  ItemDialogComponent,
  ItemListComponent,
  PasswordBoxComponent,
  PopupCheckBoxComponent,
  PopupRadioComponent,
  PopupTreeComponent,
  RadioComponent,
  SpreadsheetComponent,
  TextAreaComponent,
  TextBoxComponent,
];

const FORM_COMPONENTS = [
  DynamicFormComponent,
  FormBlockComponent,
  ImageCacheComponent,
  ImageSearchComponent,
  ImageSliderComponent,
  ImageUploadComponent,
  ImageWebComponent,
  SimpleSearchComponent,
  TreeNodeIconComponent,
  ...ENTRY_COMPONENTS,
];

const FORM_DIRECTIVE = [
  DynamicFieldDirective,
  InputEqualValidatorDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbRadioModule,
    NbCardModule,
    NbCheckboxModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbAlertModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbSelectModule,
    NbTabsetModule,
    NbCalendarModule,
    NbActionsModule,
    NbProgressBarModule,
    NbTreeGridModule,
    NbStepperModule,
    CKEditorModule,
    FileUploadModule,
  ],
  declarations: [
    ...FORM_COMPONENTS,
    ...FORM_DIRECTIVE,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  exports: [
    ...FORM_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  providers: [
    { provide: ResourceProvider, useClass: DemoResourceProvider },
    { provide: SearchProvider, useClass: DemoSimpleSearchProvider },
    { provide: TreeProvider, useClass: DemoTreeSearchProvider },
  ],
})
export class SfDynamicFormModule {
}
