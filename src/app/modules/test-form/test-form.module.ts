import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
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
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule } from 'ng2-file-upload';

import { TestFieldDirective } from './directive/test-field.directive';
import { TestComponentComponent } from './test-component/test-component.component';
import { ResourceProvider } from './test-form.provider';
import { DemoResourceProvider } from './providers/resource.provider';
import { InComponentComponent } from './in-component/in-component.component';
import { ImageTreeComponent } from './image-tree/image-tree.component';
@NgModule({
  declarations: [TestComponentComponent, InComponentComponent, TestFieldDirective, ImageTreeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    NbEvaIconsModule,
    NbDatepickerModule,
    NbDialogModule,
    NbWindowModule,
    CKEditorModule,
    FileUploadModule,
  ],
  exports: [
    TestComponentComponent,
    InComponentComponent,
    ImageTreeComponent,
  ],
  providers: [
    { provide: ResourceProvider, useClass: DemoResourceProvider },
  ],
  entryComponents: [
    InComponentComponent,
  ],
})
export class TestFormModule { }
