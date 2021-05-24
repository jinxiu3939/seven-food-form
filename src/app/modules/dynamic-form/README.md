动态表单模块
--------------------

### 使用

```
import { SfDynamicFormModule } from 'seven-food-form';

SfDynamicFormModule.forRoot()
```

```
<ng-container *ngIf="models">
  <ngx-dynamic-form [models]="models"></ngx-dynamic-form>
</ng-container>
```

#### 表单中插入其他内容

插入内容标签的`name`属性为`other-models`

```
<ng-container *ngIf="models">
  <ngx-dynamic-form [models]="models">
    <div name="other-models">hello world</div>
  </ngx-dynamic-form>
</ng-container>
```

#### 更改表单布局样式

```
::ng-deep ngx-dynamic-form .dynamic-form .form-inline {
  .inline-group {
    width: 50%;
  }
}
```

#### 输入属性

##### loading

加载状态，用来控制表单不可编辑

例如：表单在提交触发之后，状态设为`true`，不可再次提交，
直到父组件在提交结束之后，如果需要继续提交，则设置状态为`false`

##### buttons

操作按钮

自定义操作按钮，类型：FormButton，参见`dynamic-form.options.ts`

##### layout

布局方式

目前支持如下布局：

- tab
- step
- inline
- block，**default**

##### models

表单布局配置，类型：ModelGroup，参见`dynamic-form.options.ts`

实例化`models`的表单项有三种方法

1. 对象自变量
2. 模型工厂
3. 快捷表单工厂

###### 对象自变量

- 优点 - 无需导入模型和工厂
- 缺点 - 代码不能复用，容易产生冗余代码；无法使用数据过滤，验证等功能

###### 模型工厂

- 优点 - 代码规范，易于维护，方便扩展
- 缺点 - 需要导入大量模型工厂

###### 快捷表单工厂

工厂类`QuickFormFactory`

- 使用简单，是模型工厂的快捷方式

> 推荐使用快捷表单工厂

#### 输出事件

- formSubmit，提交事件，返回表单值
- formReset，重置事件，返回`boolean`值
- formCustom，自定义事件，返回表单值和操作按钮名称

### 示例

三种实例化输入参数`models`的字段`items`的示例参见`demo.md`

### 表单模型

具体表单模型字段参见`dynamic-form.options.ts`

#### RadioModel

单选项模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string | number | boolean; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- options: Option<string | number | boolean>[]; // 选项列表
- width: number; // 选项宽度

#### CheckboxModel

多选项模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: CheckboxModel; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- clear: boolean; // 是否清除无效的值
- disabled: boolean; // 是否禁用
- options: Option<string | number | boolean>[]; // 选项列表
- width: number; // 选项宽度

#### CheckboxTreeModel

多选树模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- tree: CheckBoxTree<string | number>; // 选项树

#### CKEditorModel

`ckeditor`富文本编辑器模型

> 需要安装依赖包`"@ckeditor/ckeditor5-angular": "1.1.2"`和`"@ckeditor/ckeditor5-build-classic": "^23.1.0"`；如果需要上传图片还需要安装依赖包`@ckeditor/ckeditor5-ckfinder`并且在服务器端配置ckfinder接口

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- editor: any; // 编辑器
- editorConfig: any; // `ck-editor`配置
- kind: 'classic'; // `ck-editor`类别

#### DatePickerModel

日期时间选择器模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- clear: boolean; // 是否清空不合法日期
- disabled: boolean; // 是否禁用
- format: string; // 日期格式
- kind: 'date' | 'date-time'; // 时间类型
- now: boolean; // 是否默认当前时间

#### TextAreaModel

文本域模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- rows: number;

#### TextBoxModel

文本框模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- clear: boolean; // 是否清除不合法数据
- disabled: boolean; // 是否禁用
- kind: TextBoxType; // 文本框类型
- placeholder: string; // 提示
- readonly: boolean; // 是否只读

#### ImageModel

图片模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: ImageItem[] | string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- crawlConfig: CrawlConfig; // 抓取配置
- disabled: boolean; // 是否禁用
- display: 'image' | 'input'; // 展现方式
- kind: 'ng2-file-upload'; // 上传类别
- list: FileResource[]; // 资源列表
- multiple: boolean; // 是否多图片
- repeat: boolean; // 是否可以选择重复的图片
- searchConfig: ResourceSearchConfig; // 检索配置
- uploadConfig: UploadConfig; // 上传配置

> 应该自定义服务实现资源提供者接口：`ResourceProvider`

#### SpreadsheetModel

电子表格模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: ImageItem[] | string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- header: string[]; // 表格头
- kind: 'ng2-file-upload'; // 上传类别
- uploadConfig: UploadConfig; // 上传配置
- view: boolean; // 是否预览

> 应该自定义服务实现资源提供者接口：`ResourceProvider`

#### PopupRadioModel

弹出框式单选框模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string | number; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- options: Option<string | number>[]; // 选项列表
- readonly: boolean; // 是否只读
- searchConfig: SearchConfig; // 检索配置
- text: string; // 显示文本

> 应该自定义服务实现检索提供者接口：`SearchProvider`

#### PopupCheckboxModel

弹出框式复选框模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- options: Option<string | number>[]; // 选项列表
- searchConfig: SearchConfig; // 检索配置
- text: string[]; // 显示文本

> 应该自定义服务实现检索提供者接口：`SearchProvider`

#### PopupTreeModel

弹出框式树模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- mode: 'async' | 'sync'; //  加载方式
- text: string[]; // 显示文本
- tree: TreeNode<Option<string | number>>[]; // 选项树
- endpoint?: string; // 检索接口
- searchParameter?: any; // 检索条件
- readonly?: boolean; // 是否只读

> 应该自定义服务实现树提供者接口：`TreeProvider`

#### ItemListModel

子项目列表模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- attributes: ConditionField[]; // 字段列表
- disabled: boolean; //  是否禁用

#### PasswordBoxModel

密码框模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- empty: boolean; // 是否空置密码
- visible: boolean; //  是否可见

#### LinkageBoxTreeModel

联动框模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: (string | number)[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- data?: any; // 自定义配置数据
- root: string | number; // 根下拉框`parent`值
- tree: LinkageBoxTree<string | number>; // 选项树

#### VideoModel

视频模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: ImageItem[] | string; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- disabled: boolean; // 是否禁用
- kind: 'ng2-file-upload'; // 上传类别
- multiple: boolean; // 是否多选
- uploadConfig: UploadConfig; // 上传配置

> 应该自定义服务实现资源提供者接口：`ResourceProvider`

#### KeywordModel

关键字模型

- label: string; // 标签
- name: string; // 名称
- type: ModelType; // 类型
- value: string[]; // 值
- help?: string; // 说明
- max?: number; // 最大长度
- min?: number; // 最小长度
- order?: number; // 排序
- require?: boolean; // 是否必填
- validator?: any; // 验证器
- readonly: boolean; // 是否只读

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

