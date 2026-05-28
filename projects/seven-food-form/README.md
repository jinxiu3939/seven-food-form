七棵菜表单
-------------------
angular响应式动态表单，UI库为Nebular9

## 安装

```bash
npm install seven-food-form
```

## 使用

```ts
import { sfModelFactory } from 'seven-food-form';
import { SfFormComponent } from 'seven-food-form';
@Component({
  selector: 'app-root',
  imports: [SfFormComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
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
```

```html
<sf-form
  [model]="formModel"
  [config]="formConfig"
  (formSubmit)="onSubmit($event)"
  (formReset)="onReset()"
  (formChange)="onChange($event)">
</sf-form>
```
