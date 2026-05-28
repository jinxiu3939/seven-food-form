
#### prompt

- 重构一下SfGroupComponent组件：

SFGroupModel为布局模型，不能继承SFControlModel。它的定义应该是：
```
interface SFGroupModel extends SfFormModel {
  title?: string;
  layout?: SFLayoutType;
  models: <SFGroupModel | SFControlModel | SFArrayModel>[];
}
```
更改SfFormModel定义，它应该是所有表单对象模型的基类:
```
interface SfFormModel {
  type: string;
  name: string;
}
```

SFLayoutType的取值为：'vertical' | 'tab' | ''，去掉grid布局，grid布局应该是model为control时的默认布局（因为最终跳出递归就是在control）。
例如：Vertical的布局类似如下：
```

<!-- Vertical Layout -->
<div *ngIf="layout === 'vertical'" [formGroup]="formGroup">
  <div>{{ title }}</div>
  <div *ngFor="let model of models">
    <!-- Recursive group rendering -->
    <sf-group 
      *ngIf="model.type === 'group' && model.models"
      [title]="model.title"
      [formGroup]="formGroup.get(model.name) as FormGroup"
      [models]="model.models"
      [layout]="model.layout || ''">
    </sf-group>
    
    <!-- Array rendering -->
    <sf-array
      *ngIf="model.type === 'array' && model.models"
      [formArray]="formGroup.get(model.name) as FormArray"
      [models]="model.models"
      [title]="model.title"
    </sf-array>
    
    <!-- Control rendering -->
    <sf-control
      *ngIf="model.type === 'control'"
      [control]="formGroup.get(model.name)"
      [model]="model"
      [style.grid-template-columns]="'repeat(' + getGridColumns() + ', 1fr)'">
    </sf-control>
  </div>
</div>
```

- 更改SfFormComponent，参数models改成model: SFGroupModel


#### prompt

关于Option的用法需要调整，Option仅用来配置模型，不能被继承，用法应该如下：
```
export class SfTextBoxModel extends SfControlModel<string> {
  controlType: SfControlType;
  placeholder?: string;
  fieldSize?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
  shape?: 'rectangle' | 'semi-round' | 'round';

  constructor(option: SfTextBoxOption) {
    super(option);
    this.controlType = option.controlType || SfControlType.TEXT;
    this.placeholder = option.placeholder || '';
    this.fieldSize = option.fieldSize || 'medium';
    this.shape = option.shape || 'rectangle';
  }
}
```

### prompt

- 关于重置事件，例如我自定义一个image控件，表单重置时并不是简单的把formGroup.reset()，而是要清空图片。如何实现这类自定义的控件？
- 关于数据服务，例如我需要自定义一个接口来实现图片上传服务，但是不实现这个接口，而是由调用者来注入。应该如何设计？


去掉module, 按照如下约束，给出lib目录下的完整代码

### 组件约束

- 所有组件都是standalone，新版angular推荐使用standalone
- 不使用模块，各个组件在模块中只导入所需要的组件和模块
- 依赖在组件中添加
- 模版和样式使用单独的文件，样式文件使用scss
