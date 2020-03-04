import { Component } from '@angular/core';

import { QuickFormFactory, PasswordBoxModelFactory } from './dynamic-form'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seven-food-form';
  models = [{
    items: [
      new PasswordBoxModelFactory({
        label: '密码',
        name: 'password-1',
        require: true,
        min: 3,
      }).instance(),
      new QuickFormFactory({
        label: '验证码',
        name: 'password-2',
        max: 10,
      }).passwordBox(),
      {
        label: '密钥',
        name: 'password-3',
        type: 'password-box',
        value: '111',
        help: 'this is a password',
        order: 1,
        validator: 'inputEqual',
        visible: true,
      },
    ],
  }];
}
