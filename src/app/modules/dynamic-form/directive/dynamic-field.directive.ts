import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseModel } from '../dynamic-form.options';

/* 导入组件写相对路径，不能从`index.ts`中导入，容易形成循环依赖 */
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
import { LinkageBoxComponent } from '../components/linkage-box/linkage-box.component';
import { VideoComponent } from '../components/video/video.component';
import { KeywordComponent } from '../components/keyword/keyword.component';
import { FileComponent } from '../components/file/file.component';
import { MarkDownEditorComponent } from '../components/md-editor/md-editor.component';
import { BaiduUEditorComponent } from '../components/u-editor/u-editor.component';
import { DateRangePickerComponent } from '../components/date-range-picker/date-range-picker.component';
import { PopupCustomComponent } from '../components/popup-list/popup-custom/popup-custom.component';
import { CustomComponent } from '../components/custom/custom.component';
import { ClockComponent } from '../components/date-picker/clock.component';
import { TextCombineComponent } from '../components/text-combine/text-combine.component';
import { AttachmentComponent } from '../components/attachment/attachment.component';
import { TextRangeComponent } from '../components/text-range/text-range.component';
import { TextDiffComponent } from '../components/text-diff/text-diff.component';

// 组件集合
const COMPONENTS = {
  checkbox: CheckboxComponent,
  'checkbox-tree': CheckboxTreeComponent,
  'ck-editor': CKEditorComponent,
  'date-picker': DatePickerComponent,
  'date-range-picker': DateRangePickerComponent,
  'drop-down-box': DropDownBoxComponent,
  file: FileComponent,
  image: ImageComponent,
  'item-list': ItemListComponent,
  keyword: KeywordComponent,
  'linkage-box': LinkageBoxComponent,
  'password-box': PasswordBoxComponent,
  'popup-checkbox': PopupCheckBoxComponent,
  'popup-radio': PopupRadioComponent,
  'popup-tree': PopupTreeComponent,
  radio: RadioComponent,
  spreadsheet: SpreadsheetComponent,
  'text-area': TextAreaComponent,
  'text-box': TextBoxComponent,
  'text-combine': TextCombineComponent,
  video: VideoComponent,
  'u-editor': BaiduUEditorComponent,
  'md-editor': MarkDownEditorComponent,
  'popup-custom': PopupCustomComponent,
  'custom': CustomComponent,
  'clock': ClockComponent,
  'attachment': AttachmentComponent,
  'text-range': TextRangeComponent,
  'text-diff': TextDiffComponent,
};

@Directive({
  selector: '[sffDynamicField]',
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() model: BaseModel<any>; // 表单项
  @Input() form: FormGroup; // 表单
  @Input() reload: number; // 重新加载

  component: any;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.model.name) {
      const component = COMPONENTS[this.model.type];
      if (component) {
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory); // 创建组件
        this.component.instance.model = this.model;
        this.component.instance.form = this.form;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.component && this.component.instance && changes.reload) {
      this.model.value = Array.isArray(this.model.value) ? [] : null; // 重置模型的值
      this.component.instance.model = this.model;
      this.component.instance.resetModel(); // 重置模型
    }
  }
}
