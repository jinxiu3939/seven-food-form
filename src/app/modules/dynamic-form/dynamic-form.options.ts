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
export declare type ModelType = 'checkbox'
                                | 'checkbox-tree'
                                | 'ck-editor'
                                | 'date-picker'
                                | 'drop-down-box'
                                | 'file'
                                | 'image'
                                | 'item-list'
                                | 'keyword'
                                | 'linkage-box'
                                | 'password-box'
                                | 'popup-checkbox'
                                | 'popup-radio'
                                | 'popup-tree'
                                | 'radio'
                                | 'spreadsheet'
                                | 'text-area'
                                | 'text-box'
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
 * 表单布局配置
 */
export interface ModelGroup {
  items: BaseModel<any>[]; // 表单项列表
  column?: number[]; // 列宽度
  title?: string; // 分组标题
}

/**
 * 操作按钮
 */
export interface FormButton {
  name: string; // 按钮标识
  value: string; // 按钮文本
}

/**
 * 文件资源
 */
export interface FileResource {
  id: number; // 编号
  creation_time: string; // 创建时间
  file_name: string; // 文件名称
  size: number; // 大小
  tag: string[]; // 标签
  title: string; // 标题/描述
  topic: string; // 主题
  type: string; // 类型
  url: string; // 地址
}

/**
 * 选项组
 */
export interface Option<T> {
  text: string; // 文本
  value: T; // 值
  items?: number; // 元素数量
  title?: string; // 标题
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
  queueLimit?: number;
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
  queueLimit: number; // 可抓取最大数目
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
  queueLimit: number; // 可选择最大数目
  result: FileResource[]; // 默认结果集
}

/**
 * 轮播图片
 */
export interface ImageItem {
  title: string; // 描述
  url: any; // 地址
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
  topic: string; // 主题
}

/**
 * 资源检索参数
 */
export interface ResourceSearchParam {
  creation_time: string; // 创建时间
  file_name: string; // 文件名称
  tag: string; // 标签
  title: string; // 标题/描述
  topic: string; // 主题
  type: string; // 类型
  page_number?: number; // 分页页码
  page_size?: number; // 分页大小
}

export const ResourceSearchConditions: ConditionField[] = [
  { text: '时间', value: 'creation_time', type: 'input' },
  { text: '文件名', value: 'file_name', type: 'input' },
  { text: '标签', value: 'tag', type: 'input' },
  { text: '标题', value: 'title', type: 'input' },
  { text: '主题', value: 'topic', type: 'input' },
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
  conditions: ConditionField[]; // 检索条件选项
  mode: 'async' | 'sync'; // 检索方式
  result: Option<string | number>[]; // 默认结果集
  size: number; // 分页大小
  endpoint?: string; // 异步检索接口
}

/**
 * 条件字段
 */
export interface ConditionField {
  text: string; // 显示标签
  type: 'input' | 'drop-down' | 'drop-down-filter' | 'number'; // 类型
  value: string; // 条件名称
  options?: Option<string | number>[]; // 可选项
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
  data?: any; // 自定义配置数据
}

/**
 * 单选项模型
 */
export interface RadioModel extends BaseModel<string | number | boolean> {
  disabled: boolean; // 是否禁用
  options: Option<string | number | boolean>[]; // 选项列表
  width: number; // 选项宽度
}

/**
 * 多选项模型
 */
export interface CheckboxModel extends BaseModel<(string | number)[]> {
  clear: boolean; // 是否清除无效的值
  disabled: boolean; // 是否禁用
  options: Option<string | number>[]; // 选项列表
  width: number; // 选项宽度
}

/**
 * 多选树模型
 */
export interface CheckboxTreeModel extends BaseModel<(string | number)[]> {
  disabled: boolean; // 是否禁用
  tree: CheckBoxTree<string | number>; // 选项树
}

/**
 * `ckeditor`富文本编辑器模型
 */
export interface CKEditorModel extends BaseModel<string> {
  disabled: boolean; // 是否禁用
  editor: any; // 编辑器
  editorConfig: any; // `ck-editor`配置
  // 需要安装相应的`CKEditor Build`[https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor]
  kind: 'classic' | 'ckfinder'; // `ck-editor`类别
}

/**
 * 日期时间选择器模型
 */
export interface DatePickerModel extends BaseModel<string> {
  clear: boolean; // 是否清空不合法日期
  disabled: boolean; // 是否禁用
  format: string; // 日期格式
  kind: 'date' | 'date-time'; // 时间类型
  now: boolean; // 是否默认当前时间
  readonly: boolean; // 是否只读
}

/**
 * 图片模型
 */
export interface ImageModel extends BaseModel<ImageItem[] | string> {
  crawlConfig: CrawlConfig; // 抓取配置
  disabled: boolean; // 是否禁用
  display: 'image' | 'input'; // 展现方式
  kind: 'ng2-file-upload'; // 上传类别
  list: FileResource[]; // 资源列表
  multiple: boolean; // 是否多图片
  repeat: boolean; // 是否可以选择重复的图片
  searchConfig: ResourceSearchConfig; // 检索配置
  uploadConfig: UploadConfig; // 上传配置
}

/**
 * 多媒体模型
 */
export interface VideoModel extends BaseModel<ImageItem[] | string> {
  disabled: boolean; // 是否禁用
  kind: 'ng2-file-upload'; // 上传类别
  multiple: boolean; // 是否多文件
  uploadConfig: UploadConfig; // 上传配置
}

/**
 * 电子表格模型
 */
export interface SpreadsheetModel extends BaseModel<any[]> {
  header: string[]; // 表格头
  kind: 'ng2-file-upload'; // 上传类别
  uploadConfig: UploadConfig; // 上传配置
  view: boolean; // 是否预览
}

/**
 * 文本域模型
 */
export interface TextAreaModel extends BaseModel<string> {
  disabled: boolean; // 是否禁用
  rows: number;
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
  disabled: boolean; // 是否禁用
  kind: TextBoxType; // 文本框类型
  placeholder: string; // 提示
  readonly: boolean; // 是否只读
}

/**
 * 弹出式单选项模型
 */
export interface PopupRadioModel extends BaseModel<string | number> {
  disabled: boolean; // 是否禁用
  options: Option<string | number>[]; // 选项列表
  readonly: boolean; // 是否只读
  searchConfig: SearchConfig; // 检索配置
  text: string; // 显示文本
}

/**
 * 弹出式多选项模型
 */
export interface PopupCheckboxModel extends BaseModel<(string | number)[]> {
  disabled: boolean; // 是否禁用
  options: Option<string | number>[]; // 选项列表
  searchConfig: SearchConfig; // 检索配置
  text: string[]; // 显示文本
}

/**
 * 弹出式树模型
 */
export interface PopupTreeModel extends BaseModel<string | number> {
  disabled: boolean; // 是否禁用
  mode: 'async' | 'sync'; // 加载方式
  text: string; // 显示文本
  tree: TreeNode<Option<string | number>>[]; // 选项树
  endpoint?: string; // 检索接口
  searchParameter?: any; // 检索条件
}

/**
 * 子项目列表模型
 */
export interface ItemListModel extends BaseModel<any[]> {
  attributes: ConditionField[]; // 字段列表
  disabled: boolean; // 是否禁用
}

/**
 * 密码框模型
 */
export interface PasswordBoxModel extends BaseModel<string> {
  empty: boolean; // 是否空置密码
  visible: boolean; // 密码是否可见
}

/**
 * 联动下拉框模型
 */
export interface LinkageBoxTreeModel extends BaseModel<(string | number)[]> {
  root: string | number; // 根下拉框的复选项
  tree: LinkageBoxTree<(string | number)>; // 选项树
}

export interface KeywordModel extends BaseModel<string[]> {
  readonly: boolean; // 是否只读
  options: string[]; // 文件类型
}

/**
 * 文件框模型
 */
export interface FileModel extends BaseModel<any> {
  disabled: boolean; // 是否禁用
  kind: string[]; // 文件类型
  accept: string; // 可上传文件类型
}
