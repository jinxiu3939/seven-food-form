import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { UEditorModule } from 'ngx-ueditor';
import { ImageCropperModule } from 'ngx-image-cropper';

/* 导入组件写相对路径，不能从`index.ts`中导入，否则`npm`发布之后找不到组件 */
import { DynamicFormComponent } from './dynamic-form.component';
import { DemoResourceProvider, ResourceProvider } from './providers/data/resource-provider';
import { DemoSimpleSearchProvider, SearchProvider } from './providers/data/search-provider';
import { DemoTreeSearchProvider, TreeProvider } from './providers/data/tree-provider';
import { LangProvider } from './providers/data/lang.provider';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { InputEqualValidatorDirective } from './directive/input-equal-validator.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FormButtonComponent } from './layout/form-button/form-button.component';
import { OneLayoutComponent } from './layout/one-layout/one-layout.component';
import { TwoLayoutComponent } from './layout/two-layout/two-layout.component';
import { FormBlockComponent } from './layout/form-block/form-block.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxNodeComponent } from './components/checkbox-tree/checkbox-node/checkbox-node.component';
import { CheckboxTreeComponent } from './components/checkbox-tree/checkbox-tree.component';
import { CKEditorComponent } from './components/ck-editor/ck-editor.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DropDownBoxComponent } from './components/drop-down-box/drop-down-box.component';
import { ImageComponent } from './components/image/image.component';
import { ImageCacheComponent } from './components/image/image-cache/image-cache.component';
import { ImageSearchComponent } from './components/image/image-search/image-search.component';
import { ImageSliderComponent } from './components/image/image-slider/image-slider.component';
import { ImageUploadComponent } from './components/image/image-upload/image-upload.component';
import { ImageUploadCropperComponent } from './components/image/image-upload-cropper/image-upload-cropper.component';
import { ImageWebComponent } from './components/image/image-web/image-web.component';
import { ItemDialogComponent } from './components/item-list/item-dialog/item-dialog.component';
import { KeyValueDialogComponent } from './components/item-list/key-value-dialog/key-value-dialog.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LinkageBoxComponent } from './components/linkage-box/linkage-box.component';
import { LinkageNodeComponent } from './components/linkage-box/linkage-node/linkage-node.component';
import { PasswordBoxComponent } from './components/password-box/password-box.component';
import { PopupCheckBoxComponent } from './components/popup-list/popup-checkbox/popup-checkbox.component';
import { PopupCustomComponent } from './components/popup-list/popup-custom/popup-custom.component';
import { PopupRadioComponent } from './components/popup-list/popup-radio/popup-radio.component';
import { PopupTreeComponent } from './components/popup-list/popup-tree/popup-tree.component';
import { SimpleSearchComponent } from './components/popup-list/simple-search/simple-search.component';
import { TreeNodeIconComponent } from './components/popup-list/tree-node-icon/tree-node-icon.component';
import { RadioComponent } from './components/radio/radio.component';
import { SpreadsheetComponent } from './components/spreadsheet/spreadsheet.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { VideoComponent } from './components/video/video.component';
import { VideoSliderComponent } from './components/video/video-slider/video-slider.component';
import { VideoUploadComponent } from './components/video/video-upload/video-upload.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { FileComponent } from './components/file/file.component';
import { BaiduUEditorComponent } from './components/u-editor/u-editor.component';
import { MarkDownEditorComponent } from './components/md-editor/md-editor.component';
import { CustomComponent } from './components/custom/custom.component';
import { ClockComponent } from './components/date-picker/clock.component';
import { TextCombineComponent } from './components/text-combine/text-combine.component';

const ENTRY_COMPONENTS = [
  CheckboxComponent,
  CheckboxNodeComponent,
  CheckboxTreeComponent,
  CKEditorComponent,
  DatePickerComponent,
  DateRangePickerComponent,
  DropDownBoxComponent,
  FileComponent,
  ImageComponent,
  ItemListComponent,
  PasswordBoxComponent,
  PopupCheckBoxComponent,
  PopupRadioComponent,
  PopupTreeComponent,
  RadioComponent,
  SpreadsheetComponent,
  TextAreaComponent,
  TextBoxComponent,
  LinkageBoxComponent,
  LinkageNodeComponent,
  VideoComponent,
  KeywordComponent,
  BaiduUEditorComponent,
  MarkDownEditorComponent,
  PopupCustomComponent,
  CustomComponent,
  ClockComponent,
  TextCombineComponent,
];

const FORM_COMPONENTS = [
  DynamicFormComponent,
  FormButtonComponent,
  OneLayoutComponent,
  TwoLayoutComponent,
  FormBlockComponent,
  ImageCacheComponent,
  ImageSearchComponent,
  ImageSliderComponent,
  ImageUploadComponent,
  ImageUploadCropperComponent,
  ImageWebComponent,
  ItemDialogComponent,
  KeyValueDialogComponent,
  SimpleSearchComponent,
  TreeNodeIconComponent,
  VideoSliderComponent,
  VideoUploadComponent,
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
    HttpClientModule,
    DragDropModule,
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
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.all.min.js`,
        `./assets/ueditor/ueditor.config.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/',
      },
    }),
    ImageCropperModule,
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
    LangProvider,
  ],
})
export class SfDynamicFormModule {
  static forRoot(): ModuleWithProviders<SfDynamicFormModule> {
    return {
      ngModule: SfDynamicFormModule,
      providers: [
        ...NbDatepickerModule.forRoot().providers,
        ...NbDialogModule.forRoot().providers,
        ...NbWindowModule.forRoot().providers,
        { provide: ResourceProvider, useClass: DemoResourceProvider },
        { provide: SearchProvider, useClass: DemoSimpleSearchProvider },
        { provide: TreeProvider, useClass: DemoTreeSearchProvider },
      ],
    } as ModuleWithProviders<SfDynamicFormModule>;
  }
}
