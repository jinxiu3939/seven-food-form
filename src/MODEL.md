表单模型
---------

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
- all?: boolean; // 是否显示全部
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

> 需要安装依赖包`"@ckeditor/ckeditor5-angular": "^1.2.3"`和`"@ckeditor/ckeditor5-build-balloon-block": "^17.0.0"`；如果需要上传图片还需要安装依赖包`@ckeditor/ckeditor5-ckfinder`并且在服务器端配置ckfinder接口

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
- kind: 'classic' | 'ckfinder'; // 默认配置类型
- build: string; // 编辑器种类

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
- size: string; // 尺寸
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
- size: string; // 尺寸
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
- attributes: ConditionField[]; // 属性列表
- disabled: boolean; //  是否禁用
- size: string; //  弹出框尺寸 '' | 'medium' | 'large'

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

#### UEditorModel

`ukeditor`富文本编辑器模型

> 需要安装依赖包`"ngx-ueditor": "^2.1.3"`，并且将ueditor源码打包后放到assets目录下；如果上传图片需要在服务器端配置ueditor接口

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
- editorConfig: any; // `u-editor`配置
- kind: 'classic'; // `u-editor`类别

#### MdEditorModel

`markdown-editor`富文本编辑器模型

> 需要安装依赖包`"jquery": "^3.6.0"`，并且将editor.md源码打包后放到assets目录下，而且在`angular.json`配置`styles`中增加`src/assets/editor.md/css/editormd.css`，`scripts`中增加`node_modules/jquery/dist/jquery.min.js,src/assets/editor.md/editormd.min.js`；如果上传图片需要在服务器端配置markdown-editor接口；

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
- editorConfig: any; // `markdown-editor`配置
