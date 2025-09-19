import { Component, OnInit } from '@angular/core';

import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包

import { ApiService } from './services/api.service';
import { oneLayoutModels, oneLayoutSetting } from './services/mock-one';
import { searchModels, searchSetting } from './services/mock-model';
import { twoLayoutModels, twoLayoutSetting } from './services/mock-two';
import { checkboxModels } from './services/mock-checkbox';
import { imageModels } from './services/mock-image';
import { PopupRadioModels } from './services/mock-popup-radio';
import { radioModels } from './services/mock-radio';
import { itemListModels } from './services/mock-item-list';
import { textCombineModels } from './services/mock-text-combine';
import { TextrangeModels } from './services/mock-text-range';
import { TextdiffModels } from './services/mock-text-diff';
import { datePickerModels } from './services/mock-date-picker';
import { TextboxModels } from './services/mock-textbox';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'seven-food-form';
  models: any = TextboxModels.slice(0, 3);
  submitting = false;
  setting: any = {hideSubmit: true, hideReset: true, size: "medium"};

  constructor(private service: ApiService) {}

  ngOnInit() {
    // this.models = PopupRadioModels.concat(TextboxModels).concat(itemListModels);
    // this.setting = oneLayoutSetting;
    this.service.get().subscribe((res) => {
      // let models = mdeditorModels;
      // models[0].editorConfig = res.content.form.models[14].editorConfig;
    });
  }

  submit(form) {
    console.log(form);
    this.submitting = true;
    const formData = new FormData();
    for(let i in form) {
      formData.append(i, form[i]);
    }
    this.service.post(formData).subscribe();
    // this.submitting = false;
  }

  operate(value) {
    console.log(value);
  }

  reset(flag) {
    console.log(flag);
  }

  valueChange(data) {
    console.log(data);
  }
}
