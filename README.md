# 七棵菜表单

angular响应式动态表单，UI库为Nebular9

### 规范

#### 命名规范

- 类命名规则：前缀`Sf`+名称+后缀`Component`...。例如：`SfFormComponent`,`SfFormService`,`SfControlModel`,`SfControlOption`
- 组件选择器命名规则：前缀`sf-`+名称。例如：`sf-form`
- 文件命名规则：名称+`component`...。例如：`form.component.ts`,`control.model.ts`
- 文件夹名称，无需`sf-`前缀

#### 组件实例

- 所有组件都是standalone，新版angular推荐使用standalone
- 不使用模块，各个组件在模块中只导入所需要的组件和模块
- 依赖在组件中添加
- 模版和样式使用单独的文件，样式文件使用scss

例如：
```ts
@Component({
  selector: 'sf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.scss'],
  providers: [SfFormService],
  imports: [NbSelectModule, ReactiveFormsModule],
})
```

#### 目录结构

- models：对象模型
- components：组件
   - layouts：布局组件
   - controls：控件
   - form: 表单入口
- services：服务


### 架构

- 整个表单为一个FormGroup
- FormGroup可以嵌套FormGroup、FormArray、FormControl
- 每个组件对应一个对象模型，对象模型用于描述表单功能所需的所有场景。
- 组件分为两类
   - 布局组件，SfGroupComponent、SfArrayComponent、SfControlComponent。其中SfGroupComponent允许递归；SfArrayComponent不允许递归。
   - 控件，包含多种，SfTextBoxComponent、SfTextAreaComponent...

#### 组件

- SfFormComponent，负责表单体（表单体为一个SfGroupComponent）和按钮布局，以及表单初始化和事件。
- SfGroupComponent，负责布局（tab,grid,vertical...），可以自身递归（因为一个FormGroup可以包含另一个FormGroup），也可以嵌套SfArrrayComponent和SfControlComponent。
- SfArrayComponent，负责布局（array,list...），不允许递归，只能嵌套SfControlComponent。
- SfControlComponent，负责label、控件、提示语、错误信息等布局。
- SfTextBoxComponent、SfTextAreaComponent...控件，负责实现具体的表单功能。
