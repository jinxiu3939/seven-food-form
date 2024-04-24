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
- disabled: boolean; // 是否禁用
- all?: boolean; // 是否显示`全部`选项
- empty?: boolean; // 是否显示`无`选项
- readonly: boolean; // 是否只读
- options: Option<string | number | boolean>[]; // 选项列表
- width: number; // 选项宽度

#### CheckboxModel

多选项模型

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
- clear: boolean; // 是否清除无效的值
- readonly: boolean; // 是否只读
- options: Option<string | number>[]; // 选项列表
- width: number; // 选项宽度
- drag: boolean; // 是否可拖动
- all: boolean; // 是否可全选

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
- readonly: boolean; // 是否只读
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
- editor: any; // 编辑器，安装依赖`@ckeditor/ckeditor5-build-balloon-block`
- editorConfig: any; // `ck-editor`配置

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
- disabled: boolean; // 是否禁用
- clear: boolean; // 是否清空不合法日期
- format: string; // 日期格式
- kind: 'date' | 'date-time'; // 时间类型
- now: boolean; // 是否默认当前时间
- readonly: boolean; // 是否只读

#### DateRangePickerModel

日期范围选择器

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
- clear: boolean; // 是否清空不合法日期
- format: string; // 返回值日期格式
- readonly: boolean; // 是否只读

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
- readonly: boolean; // 是否只读
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
- disabled: boolean; // 是否禁用
- clear: boolean; // 是否清除不合法数据
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
- disabled: boolean; // 是否禁用
- crawlConfig: CrawlConfig; // 抓取配置
- display: 'image' | 'input'; // 展现方式
- list: FileResource[]; // 资源列表
- multiple: boolean; // 是否多图片
- repeat: boolean; // 是否可以选择重复的图片
- searchConfig: ResourceSearchConfig; // 检索配置
- uploadConfig: UploadConfig; // 上传配置
- cropperConfig: CropperConfig; // 裁剪配置
- aspectRatioHeight?: number; // 裁剪图片纵横比高度
- aspectRatioWidth?: number; // 裁剪图片纵横比宽度
- cropperType?: string; // 裁剪图片格式
- hideCrawl?: boolean; // 是否隐藏图片抓取组件
- hideCropper?: boolean; // 是否隐藏图片裁剪组件
- hideSearch?: boolean; // 是否隐藏图片检索组件
- hideUpload?: boolean; // 是否隐藏图片上传组件
- queueLimit?: number; // 单次操作最大图片数目
- searchDisplay?: 'page' | 'list'; // 检索结果显示方式
- searchMode?: 'async' | 'sync'; // 检索方式
- debug?: boolean; // 是否开启调试模式

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
- disabled: boolean; // 是否禁用
- header: string[]; // 表格头
- uploadConfig: UploadConfig; // 上传配置
- view: boolean; // 是否预览

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
- size: string; // 按钮尺寸
- text: string; // 显示文本


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
- readonly: boolean; // 是否只读
- options: Option<string | number>[]; // 选项列表
- searchConfig: SearchConfig; // 检索配置
- text: string[]; // 显示文本
- drag: boolean; // 是否可拖动

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
- readonly: boolean; // 是否只读
- mode: 'async' | 'sync'; //  加载方式
- text: string[]; // 显示文本
- tree: TreeNode<Option<string | number>>[]; // 选项树
- endpoint: string; // 检索接口
- searchParameter: any; // 检索条件
- size: 'tiny' | 'small' | 'medium'; // 操作按钮尺寸
- filter: boolean; // 是否显示检索框

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
- disabled: boolean; //  是否禁用
- attributes: ConditionField[]; // 字段列表
- kind: 'item' | 'key-value'; // 弹出框类型
- keyValue: KeyValueItemModel[]; // 键值对配置
- height: string; // 列表大小 small | medium | large
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
- visible: boolean; // 密码是否可见

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
- readonly: boolean; // 是否只读
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
- multiple: boolean; // 是否多选
- uploadConfig: UploadConfig; // 上传配置
- queueLimit: number; // 单次上传最大文件数目

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
- options: string[]; // 选项
- drag: boolean; // 是否可拖动

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
- editorConfig: any; // `ueditor`配置 [http://fex.baidu.com/ueditor/#start-config]
- allowDivTransToP: boolean; // 允许进入编辑器的div标签自动变成p标签
- autoFloatEnabled: boolean; // 是否保持toolbar的位置不动
- autoHeightEnabled: boolean; // 是否自动行高
- initialFrameHeight: number; // 初始化编辑器高度
- lang: string; // 语言包
- maximumWords: number; // 最大字数
- readonly: boolean; // 是否只读
- retainOnlyLabelPasted: boolean; // 粘贴只保留标签，去除标签所有属性
- topOffset: number; // 浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
- wordCount: boolean; // 是否开启字数统计
- zIndex: number; // 弹出框层级

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
- readonly: boolean; // 是否只读
- height: number; // 高度

#### FileModel

文件

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
- kind: string[]; // 文件类型 xls | word | txt | image | video | audio | pdf | json
- accept: string; // 可上传文件具体类型
- download: string; // 已上传文件下载地址

#### PopupCustomModel

自定义对话框

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
- readonly: boolean; // 是否只读
- renderComponent: any; // 对话框组件
- text: string; // 显示文本
- size: 'tiny' | 'small' | 'medium'; // 尺寸

#### CustomModel

自定义表单组件

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
- renderComponent: any; // 自定义组件
- onComponentInitFunction: Function;

#### ClockModel

时钟

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
- now: boolean; // 是否默认当前时间
- readonly: boolean; // 是否只读
- kind: '12' | '24'; // 12小时制或者24小时制

#### TextCombineModel

组合输入框

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
- attributes: ConditionField[]; // 字段列表
- kind: TextBoxType; // 文本框类型
- readonly: boolean; // 是否只读

#### AttachmentModel

附件

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
- debug: boolean; // 是否开启调试模式
- drag: boolean; // 是否可拖动排序
- multiple: boolean; // 是否多文件
- queueLimit: number; // 单次上传最大文件数目
- searchConfig: ResourceSearchConfig; // 检索配置
- uploadConfig: UploadConfig; // 上传配置
- allowedUploadFileType: string[]; // 允许上传的文件类型
- maxUploadFileSize: number; // 允许上传文件大小最大值
