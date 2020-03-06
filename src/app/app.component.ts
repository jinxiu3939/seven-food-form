import { Component } from '@angular/core';

import {
  QuickFormFactory,
} from './modules/dynamic-form';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seven-food-form';
  models = [{
    items: [
      new QuickFormFactory({
        label: '验证码',
        name: 'password-2',
        max: 10,
      }).passwordBox(),
      new QuickFormFactory({
        label: '场馆',
        name: 'item-1',
        value: null,
      }).itemList(),
      new QuickFormFactory({
        display: 'input',
        label: '图片',
        multiple: false,
        name: 'image-1',
        uploadConfig: {
          authTokenHeader: 'Token',
          authToken: '1949vx44zmVlndq4V9K9NeMgUX8WohaV/H+gBDFebNUTg0ufIg5t',
          url: '/api/upload/image',
        },
      }).image(),
      new QuickFormFactory({
        label: '颜色',
        name: 'color',
        type: 'radio',
        options: [
          { text: '红色', value: 'red', title : '一种颜色', items: 1 },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 1000 },
        ],
        value: 'red',
      }).radio(),
      {
        label: '颜色',
        name: 'color2',
        options: [
          { text: '红色', value: 'red', title : '一种颜色', items: '99+' },
          { text: '绿色', value: 'green', title : '大自然的颜色', items: 10 },
          { text: '青色', value: 'cyan', title : '大自然的颜色' },
        ],
        type: 'radio',
        value: 'red',
        disabled: false,
        help: 'this is a radio demo',
        max: 10,
        min: 3,
        order: 1,
        require: true,
        validator: '',
        width: 4,
      },
      new QuickFormFactory({
        label: '是否禁用',
        name: 'yes_no1',
        value: false,
      }).booleanRadio(),
      {
        label: '是否禁用',
        name: 'yes_no3',
        options: [
          { text: '是', value: true },
          { text: '否', value: false, items: '99+' },
        ],
        type: 'radio',
        value: false,
        disabled: false,
        help: 'this is a radio demo',
        order: 1,
        require: true,
        validator: '',
      },
      new QuickFormFactory({
        label: '下拉框',
        name: 'drop-down-1',
        options: [
          { text: '全部', value: '', title : '全部' },
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
      }).dropDownBox(),
      {
        label: '下拉框',
        name: 'drop-down-3',
        type: 'drop-down-box',
        value: '气球是怎么飞起来的呢？',
        help: 'this is a text area',
        options: [
          { text: '苹果', value: 'apple', title : '一种水果' },
          { text: '梨', value: 'pear', title : '一种水果' },
        ],
        order: 1,
        placeholder: '',
        validator: '',
      },
      new QuickFormFactory({
        clear: true,
        label: '日期时间',
        name: 'date-time-1',
        now: true,
        require: true,
        value: '哈啊哈',
      }).datePicker(),
    ],
  }];
  submitting = false;

  submit(value) {
    console.log(value);
    this.submitting = true;
  }
}
