# SevenFoodForm

This project is a angular module of dynamic form based on [nebular](https://github.com/akveo/nebular).

### 使用

- get package from npm.

```
npm install seven-food-form
```

- import the module

```
import { SfDynamicFormModule } from 'seven-food-form';

SfDynamicFormModule.forRoot()
```

```
<sff-dynamic-form [models]="models" [setting]="setting" lang='zh' [loading]="loading"></sff-dynamic-form>
```

> 如果使用ckeditor，需要导入依赖包

```
import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'; // 导入`ckeditor`语言包
import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'; // 导入`ckeditor`模块
this.model.editor = ClassicEditor;
```

#### 表单附加内容

插入内容标签的`name`属性为`other-models`

```
<sff-dynamic-form [models]="models" [setting]="setting" lang='zh' [loading]="loading">
  <div name="other-models">hello world</div>
</sff-dynamic-form>
```

#### 输入属性

##### loading

加载状态，用来控制表单不可编辑

例如：表单在提交之后，`loading`可设为`true`，则其不可再次提交，提交结束之后，如果可以继续提交，则可设为`false`

##### setting

表单配置，支持三层结构，类型：FormSetting，属性如下：

- validate: boolean; // 点击提交按钮是否校验表单
- foldBody: boolean; // 表单体是否折叠
- bodyWidth: number; // 表单体宽度
- size: string; // 一行放几个表单项 'extra-large'(default)(1个) | 'large'(2个) | 'medium'(3个) | 'small'(4个) | 'tiny'(5个)
- width: number; // 每个表单项中表单组件的宽度
- buttonWidth: number; // 按钮宽度
- buttons: FormButton[]; // 按钮
- buttonAlign: string; // 按钮对齐方式
- buttonFixed: boolean; // 按钮是否悬浮
- buttonPosition: string; // 按钮悬浮位置
- hideSubmit: boolean; // 隐藏提交按钮
- submitText: string; // 提交按钮文本
- hideReset: boolean; // 隐藏重置按钮
- resetText: string; // 提交按钮文本
- blockId: string; // 块标识
- blockTitle: string; // 块标题
- blockLayout: string; // 块布局方式 'tab' | 'step' | 'ul'(default)
- hideBlockBody: boolean; // 块内容是否隐藏
- children: FormSetting[]; // 子块

##### models

表单项集合，类型：BaseModel<any>[]

实例化表单项`BaseModel`的有三种方法

1. 对象自变量
   - 优点 - 无需导入模型和工厂
   - 缺点 - 代码不能复用，容易产生冗余代码；无法使用数据过滤，验证等功能
2. 模型工厂
   - 优点 - 代码规范，易于维护，方便扩展
   - 缺点 - 需要导入大量模型工厂
3. 快捷表单工厂
   - 缺点 - 导入工厂类`QuickFormFactory`
   - 优点 - 使用简单，是模型工厂的快捷方式；校验并自动格式化参数类型，有效避免参数错误时无法构建表单
   > 推荐使用快捷表单工厂

##### lang

语言包

目前支持语言包

- en，英文
- ja，日文
- zh，中文，**default**

#### 输出事件

- formSubmit，提交事件，返回表单值
- formReset，重置事件，返回`boolean`值
- formCustom，自定义事件，返回表单值和操作名称

### 示例

三种实例化`BaseModel`的示例参见`demo.md`

### 备注

响应式表单，无双向数据绑定，数据只能从视图流向控制器

- 控制器内表单绑定数据的方式
```
this.form.controls[name].setValue(value);
```

- 模板绑定表单
```
<div [formGroup]="form">
  <input [formControlName]="name" [value]="value">
</div>  
```
