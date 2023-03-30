import { Component, OnInit } from '@angular/core';

import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包

import { ApiService } from './services/api.service';
import { oneLayoutModels, oneLayoutSetting } from './services/mock-one';
import { searchModels, searchSetting } from './services/mock-model';
import { twoLayoutModels, twoLayoutSetting } from './services/mock-two';
import { ckeditorModels } from './services/mock-ckeditor';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'seven-food-form';
  models: any;
  submitting = false;
  setting: any;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.service.get().subscribe(() => {
      this.models = ckeditorModels;
      this.setting = searchSetting;
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
}
