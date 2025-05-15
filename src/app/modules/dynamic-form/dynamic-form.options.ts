import {
  ChineseWordValidator,
  EmailValidator,
  EnglishWordValidator,
  LetterNameValidator,
  MobileValidator,
  UrlValidator,
} from './validators';

/**
 * 表单项类型
 * 即组件类型
 */
export declare type ModelType = 'attachment'
                                |'checkbox'
                                | 'checkbox-tree'
                                | 'clock'
                                | 'ck-editor'
                                | 'custom'
                                | 'date-picker'
                                | 'date-range-picker'
                                | 'drop-down-box'
                                | 'file'
                                | 'image'
                                | 'item-list'
                                | 'keyword'
                                | 'linkage-box'
                                | 'md-editor'
                                | 'password-box'
                                | 'popup-checkbox'
                                | 'popup-custom'
                                | 'popup-radio'
                                | 'popup-tree'
                                | 'radio'
                                | 'spreadsheet'
                                | 'text-area'
                                | 'text-box'
                                | 'text-combine'
                                | 'text-diff'
                                | 'text-range'
                                | 'u-editor'
                                | 'video';

// 验证器集合
export const VALIDATORS = {
  chineseWord: ChineseWordValidator,
  email: EmailValidator,
  englishWord: EnglishWordValidator,
  letterName: LetterNameValidator,
  mobile: MobileValidator,
  url: UrlValidator,
};

/**
 * 表单配置
 */
export interface FormSetting {
  validate: boolean; // 点击提交按钮是否校验表单
  foldBody: boolean; // 表单体是否折叠
  bodyWidth: number; // 表单体宽度
  size: string; // 一行放几个表单项 'extra-large'(default)(1个) | 'large'(2个) | 'medium'(3个) | 'small'(4个) | 'tiny'(5个)
  width: number; // 每个表单项中表单组件的宽度
  buttonWidth: number; // 按钮宽度
  buttons: FormButton[]; // 按钮
  buttonAlign: string; // 按钮对齐方式
  buttonFixed: boolean; // 按钮是否悬浮
  buttonPosition: string; // 按钮悬浮位置
  hideSubmit: boolean; // 隐藏提交按钮
  submitText: string; // 提交按钮文本
  hideReset: boolean; // 隐藏重置按钮
  resetText: string; // 重置按钮文本
  blockId: string; // 块标识
  blockTitle: string; // 块标题
  blockLayout: string; // 块布局方式
  hideBlockBody: boolean; // 块内容是否隐藏
  children: FormSetting[]; // 子块
}

/**
 * 操作按钮
 */
export interface FormButton {
  name: string; // 按钮标识
  value: string; // 按钮文本
  validate: boolean; // 点击按钮是否校验表单
}

/**
 * 文件资源
 */
export interface FileResource {
  id: number; // 编号
  create_time: string; // 创建时间
  file_name: string; // 文件名称
  size: number; // 大小
  tag: string[]; // 标签
  title: string; // 标题/描述
  type: string; // 类型
  url: string; // 地址
  thumb_url?: string; // 缩略图地址
}

/**
 * 选项组
 */
export interface Option<T> {
  text: string; // 标签
  value: T; // 值
  items?: number; // 元素数量
  title?: string; // 描述
}

/**
 * 多选节点树
 */
export interface CheckBoxTree<T> {
  text: string; // 文本
  value: T; // 值
  checked?: boolean; // 是否选中
  children?: CheckBoxTree<T>[]; // 子元素
  items?: number; // 元素数量
  title?: string; // 标题
}

/**
 * 联动下拉项
 */
export interface LinkageOption<T> {
  text: string; // 文本
  value: T; // 值
  parent: T; // 上级下拉项的值
}

/**
 * 联动下拉框
 */
export interface LinkageBoxTree<T> {
  options: LinkageOption<T>[]; // 当前下拉框选项
  selected: T; // 当前选中的值
  children?: LinkageBoxTree<T>; // 子元素
}

/**
 * 文件裁剪配置
 */
export interface CropperConfig {
  additionalParameter: ResourceSaveParam; // 额外参数
  maxFileSize: number;
  headers: {
    [header: string]: string | string[];
  }; // 上传接口请求头
  url: string; // 上传地址
}

/**
 * 文件上传配置
 */
export interface UploadConfig {
  additionalParameter: ResourceSaveParam; // 额外参数
  allowedFileType: string[];
  authToken: string; // 权限
  authTokenHeader: string;
  itemAlias: string; // 表单项名称
  maxFileSize: number;
  method: string;
  url: string; // 上传地址
}

/**
 * 网络资源抓取配置
 */
export interface CrawlConfig {
  additionalParameter: ResourceSaveParam; // 保存额外参数
  api: string; // 保存接口
  headers: {
    [header: string]: string | string[];
  }; // 保存接口请求头
}

/**
 * 文件资源检索配置
 */
export interface ResourceSearchConfig {
  additionalParameter: ResourceSearchParam; // 检索条件
  api: string; // 检索接口
  display: 'page' | 'list'; // 显示方式
  headers: {
    [header: string]: string | string[];
  }; // 检索接口请求头
  mode: 'async' | 'sync'; // 检索方式
  result: FileResource[]; // 默认结果集
}

/**
 * 轮播图片
 */
export interface ImageItem {
  title: string; // 描述
  url: any; // 地址
  thumb?: string; // 缩略图
}

/**
 * 图片描述
 * 属性可扩展
 */
export interface ImageDescription {
  index: number; // 图片编号
  title: string; // 图片描述
}

/**
 * 图片排序
 */
export interface ImageListOrder {
  index: number; // 排序前序号
  order: number; // 排序后序号
}

/**
 * 资源保存参数
 */
interface ResourceSaveParam {
  tag: string[]; // 标签
  title: string; // 描述
}

/**
 * 资源检索参数
 */
export interface ResourceSearchParam {
  creation_time: string; // 创建时间
  file_name: string; // 文件名称
  tag: string; // 标签
  title: string; // 标题/描述
  type: string; // 类型
  page_number?: number; // 分页页码
  page_size?: number; // 分页大小
}

export const ResourceSearchConditions: ConditionField[] = [
  // { text: '时间', value: 'create_time', type: 'input' },
  { text: '文件名', value: 'file_name', type: 'input' },
  // { text: '标签', value: 'tag', type: 'input' },
  { text: '描述', value: 'title', type: 'input' },
];

/**
 * 导入行结果
 */
export interface ImportResultRow {
  reason: string; // 结果说明
  result: boolean; // 导入结果
  row_id: number; // 表格行号
}

/**
 * 检索配置
 */
export interface SearchConfig {
  additionalParameter: any; // 异步检索条件
  mode: 'async' | 'sync'; // 检索方式
  conditions?: ConditionField[]; // 检索条件选项
  endpoint?: string; // 异步检索接口
  result?: Option<string | number>[]; // 默认结果集
  size?: number; // 分页大小
}

/**
 * 条件字段
 */
export interface ConditionField {
  text: string; // 显示标签
  type: 'input' | 'drop-down' | 'drop-down-filter' | 'number' | 'boolean-radio' | 'textarea' | 'datetime' | 'date'; // 类型
  value: string; // 条件字段名称
  options?: Option<string | number>[]; // 选项
  mode?: 'async' | 'sync'; // 选项检索方式
  endpoint?: string; // 选项异步检索接口
  size?: number; // 选项异步检索数量
  param?: string; // 选项异步检索参数名称
}

/**
 * 树节点
 */
export interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

/**
 * 键值对子项
 */
export interface KeyValueItemModel {
  key: string; // 键
  type: 'input' | 'drop-down' | 'drop-down-filter' | 'number' | 'boolean-radio' | 'textarea', // 类型
  options?: Option<string | number>[]; // 值选项
}



/**
 * 表单项模型父类
 */
export interface BaseModel<T> {
  label: string; // 标签
  name: string; // 名称
  type: ModelType; // 类型
  value: T; // 值
  help?: string; // 说明
  max?: number; // 最大长度
  min?: number; // 最小长度
  order?: number; // 排序
  require?: boolean; // 是否必填
  validator?: any; // 验证器
  disabled: boolean; // 是否禁用。禁用后不会做变更检查，尽管显示表单组件，但是无法作为表单值提交
  block: any; // 对应block标识
  payload?: any; // 自定义配置数据
  tooltip?: boolean; // 是否显示提示
}

/**
 * 单选项模型
 */
export interface RadioModel extends BaseModel<string | number | boolean> {
  all: boolean; // 是否显示全部
  empty: boolean; // 是否显示无
  readonly: boolean; // 是否只读
  options: Option<string | number | boolean>[]; // 选项列表
  width: number; // 选项宽度
}

/**
 * 多选项模型
 */
export interface CheckboxModel extends BaseModel<(string | number)[]> {
  clear: boolean; // 是否清除不合法的值，不包含在options中的值将被清除
  options: Option<string | number>[]; // 选项列表
  readonly: boolean; // 是否只读
  width: number; // 选项宽度，控制一行显示几个选项，12分格
  drag: boolean; // 是否可拖动
  all?: boolean; // 是否可全选
}

/**
 * 多选树模型
 */
export interface CheckboxTreeModel extends BaseModel<(string | number)[]> {
  readonly: boolean; // 是否只读
  tree: CheckBoxTree<string | number>; // 选项树
}

/**
 * `ckeditor`富文本编辑器模型
 */
export interface CKEditorModel extends BaseModel<string> {
  // 导入`ckeditor`模块
  // 需要安装相应的`CKEditor Build`[https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor]
  editor: any; // 编辑器
  editorConfig: any; // `ck-editor`配置
}

/**
 * `ueditor`富文本编辑器模型
 */
 export interface UEditorModel extends BaseModel<string> {
  editorConfig: any; // `ueditor`配置 [http://fex.baidu.com/ueditor/#start-config]
  allowDivTransToP: boolean; // 允许进入编辑器的div标签自动变成p标签
  autoFloatEnabled: boolean; // 是否保持toolbar的位置不动
  autoHeightEnabled: boolean; // 是否自动行高
  initialFrameHeight: number; // 初始化编辑器高度
  lang: string; // 语言包
  maximumWords: number; // 最大字数
  readonly: boolean; // 是否只读
  retainOnlyLabelPasted: boolean; // 粘贴只保留标签，去除标签所有属性
  topOffset: number; // 浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
  wordCount: boolean; // 是否开启字数统计
  zIndex: number; // 弹出框层级
}

/**
 * `markdowneditor`富文本编辑器模型
 */
 export interface MdEditorModel extends BaseModel<string> {
  editorConfig: any; // `markdown-editor`官网 [https://pandao.github.io/editor.md/]
  readonly: boolean; // 是否只读
  height: number; // 高度
}

/**
 * 日期时间选择器模型
 */
export interface DatePickerModel extends BaseModel<string> {
  clear: boolean; // 是否清空不合法日期
  format: string; // 返回值日期格式，非显示值，显示值固定格式：'YYYY-MM-DD HH:mm:ss'
  kind: 'date' | 'date-time'; // 类型，date-time有时间组件
  now: boolean; // 是否默认当前日期
  readonly: boolean; // 是否只读
}

/**
 * 日期范围选择器模型
 */
export interface DateRangePickerModel extends BaseModel<{start: string, end: string}> {
  clear: boolean; // 是否清空不合法日期
  format: string; // 返回值日期格式
  readonly: boolean; // 是否只读
}

/**
 * 图片模型
 */
export interface ImageModel extends BaseModel<ImageItem[] | string> {
  display: 'image' | 'input'; // 展现方式
  multiple: boolean; // 是否多图片
  repeat: boolean; // 图片是否可重复
  crawlConfig: CrawlConfig; // 抓取配置
  cropperConfig: CropperConfig; // 裁剪配置
  searchConfig: ResourceSearchConfig; // 检索配置
  uploadConfig: UploadConfig; // 上传配置
  aspectRatioHeight?: number; // 裁剪图片纵横比高度
  aspectRatioWidth?: number; // 裁剪图片纵横比宽度
  cropperType?: string; // 裁剪图片格式
  hideCrawl?: boolean; // 是否隐藏图片抓取组件
  hideCropper?: boolean; // 是否隐藏图片裁剪组件
  hideSearch?: boolean; // 是否隐藏图片检索组件
  hideUpload?: boolean; // 是否隐藏图片上传组件
  list?: FileResource[]; // 同步操作时的图片列表
  queueLimit?: number; // 单次操作最大图片数目
  searchDisplay?: 'page' | 'list'; // 检索结果显示方式
  searchMode?: 'async' | 'sync'; // 检索方式
  debug?: boolean; // 是否开启调试模式
}

/**
 * 多媒体模型
 */
export interface VideoModel extends BaseModel<ImageItem[] | string> {
  multiple: boolean; // 是否多文件
  queueLimit: number; // 单次上传最大文件数目
  uploadConfig: UploadConfig; // 上传配置
}

/**
 * 电子表格模型
 */
export interface SpreadsheetModel extends BaseModel<any[]> {
  header: string[]; // 表格头
  uploadConfig: UploadConfig; // 上传配置
  view: boolean; // 是否预览
}

/**
 * 文本域模型
 */
export interface TextAreaModel extends BaseModel<string> {
  readonly: boolean; // 是否只读
  rows: number; // 行数
}

declare type TextBoxType = 'button'
                           | 'color'
                           | 'date'
                           | 'datetime'
                           | 'datetime-local'
                           | 'email'
                           | 'file'
                           | 'month'
                           | 'number'
                           | 'password'
                           | 'range'
                           | 'search'
                           | 'text'
                           | 'time'
                           | 'url'
                           | 'week';
/**
 * 文本框模型
 */
export interface TextBoxModel extends BaseModel<string> {
  clear: boolean; // 是否清除不合法数据
  kind: TextBoxType; // 文本框类型
  placeholder: string; // 提示
  readonly: boolean; // 是否只读
}

/**
 * 弹出式单选项模型
 */
export interface PopupRadioModel extends BaseModel<string | number> {
  options: Option<string | number>[]; // 选项列表
  readonly: boolean; // 是否只读
  searchConfig: SearchConfig; // 检索配置
  text: string; // 显示文本
  size?: 'tiny' | 'small' | 'medium'; // 尺寸
}

/**
 * 弹出式多选项模型
 */
export interface PopupCheckboxModel extends BaseModel<(string | number)[]> {
  readonly: boolean; // 是否只读
  options: Option<string | number>[]; // 选项列表
  searchConfig: SearchConfig; // 检索配置
  text: any; // 显示文本
  drag: boolean; // 是否可拖动
}

/**
 * 弹出式树模型
 */
export interface PopupTreeModel extends BaseModel<string | number> {
  text: string; // 显示文本
  tree: TreeNode<Option<string | number>>[]; // 同步选项树
  searchConfig: SearchConfig; // 异步检索配置
  readonly?: boolean; // 是否只读
  size?: 'tiny' | 'small' | 'medium'; // 操作按钮尺寸
  filter?: boolean; // 是否可检索
}

/**
 * 子项目列表模型
 */
export interface ItemListModel extends BaseModel<any[]> {
  attributes: ConditionField[]; // 字段列表
  size: string; // 弹出框大小 medium | large
  kind: 'item' | 'key-value'; // 弹出框类型
  keyValue: KeyValueItemModel[]; // 键值对配置
  height: string; // 列表大小 small | medium | large
}

/**
 * 密码框模型
 */
export interface PasswordBoxModel extends BaseModel<string> {
  empty: boolean; // 是否空置密码
  visible: boolean; // 密码是否可见
  sureValue: string; // 确认密码初始值
}

/**
 * 联动下拉框模型
 */
export interface LinkageBoxTreeModel extends BaseModel<(string | number)[]> {
  readonly: boolean; // 只读
  root: string | number; // 根下拉框的值
  tree: LinkageBoxTree<(string | number)>; // 选项树
  filter: boolean; // 是否可检索
}

/**
 * 关键字模型
 */
export interface KeywordModel extends BaseModel<string[]> {
  readonly: boolean; // 是否只读
  options: string[]; // 选项
  drag: boolean; // 是否可拖动
}

/**
 * 文件框模型
 */
export interface FileModel extends BaseModel<any> {
  kind: string[]; // 文件类型
  accept: string; // 可上传文件类型
  download: string; // 下载地址
}

/**
 * 自定义对话框模型
 */
export interface PopupCustomModel extends BaseModel<any> {
  readonly: boolean; // 是否只读
  renderComponent: any; // 对话框组件
  text: string; // 显示文本
  size: 'tiny' | 'small' | 'medium'; // 尺寸
}

/**
 * 自定义模型
 */
export interface CustomModel extends BaseModel<any> {
  renderComponent: any; // 自定义组件
  onComponentInitFunction: Function;
}

/**
 * 时钟模型
 */
export interface ClockModel extends BaseModel<{h: string, i: string, a: string}> {
  now: boolean; // 是否默认当前时间
  readonly: boolean; // 是否只读
  kind: '12' | '24'; // 12小时制或者24小时制
}

/**
 * 组合输入框模型
 */
export interface TextCombineModel extends BaseModel<any> {
  attributes: ConditionField[]; // 字段列表
  kind: TextBoxType; // 文本框类型
  readonly: boolean; // 是否只读
}

/**
 * 附件模型
 */
export interface AttachmentModel extends BaseModel<ImageItem[]> {
  debug: boolean; // 是否开启调试模式
  drag: boolean; // 是否可拖动排序
  multiple: boolean; // 是否多文件
  queueLimit: number; // 单次上传最大文件数目
  searchConfig: ResourceSearchConfig; // 检索配置
  uploadConfig: UploadConfig; // 上传配置
  allowedUploadFileType: string[]; // 允许上传的文件类型
  maxUploadFileSize: number; // 允许上传文件大小最大值
}

/**
 * 比较输入框模型
 */
export interface TextDiffModel extends BaseModel<{op: string, text: any}> {
  kind: TextBoxType; // 文本框类型
  placeholder: string; // 提示
  operators: Option<string>[]; // 操作符列表
  position: 'left' | 'right'; // 操作符位置
}

/**
 * 范围输入框模型
 */
export interface TextRangeModel extends BaseModel<{start: any, end: any}> {
  kind: TextBoxType; // 文本框类型
  placeholder: string; // 提示，-分割
}
