import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';

import { sfModelFactory } from 'seven-food-form';
import { SfFormComponent } from 'seven-food-form';

import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SfFormComponent, NbButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // providers: [NbThemeService] // 临时添加
})
export class App implements OnInit {
  protected readonly title = signal('test-app');
  formModel = sfModelFactory.groupWithModels('root', [
    sfModelFactory.text('username', '用户名', { required: true }),
    sfModelFactory.email('email', '邮箱', { required: true }),
    sfModelFactory.textarea('bio', '个人简介')
  ], {
    title: '用户信息',
    layout: 'vertical'
  });

  formConfig = {
    submitButtonText: '保存',
    resetButtonText: '重置',
    showReset: true
  };

  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    this.themeService.changeTheme('default'); // 手动激活
    this.themeService.getJsTheme().subscribe(theme => {
      console.log(theme);
      console.log('HTML classes:', document.documentElement.className);
    });
    // document.documentElement.classList.add('nb-theme-default');
  }

  onSubmit(value: any): void {
    console.log('提交:', value);
  }

  onReset(): void {
    console.log('表单已重置');
  }

  onChange(event: any): void {
    console.log(`${event.key} 变更为:`, event.value);
  }
}
