import { Component, OnInit } from '@angular/core';

import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包

import { ApiService } from './services/api.service';
import { defaultModels } from './services/mock';
import { modesss } from './services/mock-model';
import { realModels } from './services/mock-real-model';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'seven-food-form';
  models: any;
  submitting = false;
  buttons = [
    {value: 'export', name: 'export'},
    {value: 'import', name: 'import'},
  ];
  trees = [];
  inlineModels: any;
  imageTrees = [];

  constructor(private service: ApiService) {}

  ngOnInit() {
    // this.imageTrees.push(this.checkboxTree);
    // this.imageTrees.push(this.checkboxTree);
    this.service.get().subscribe(() => {
      this.trees.push({components: realModels, title: 'realModels'});
      this.trees.push({components: defaultModels, title: 'defaultModels'});
      // this.models = defaultModels;
      // this.models = modesss;
      this.inlineModels = defaultModels;

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
  }

  operate(value) {
    console.log(value);
  }

  reset(flag) {
    console.log(flag);
  }
}
