import { RadioModelFactory } from './radio-model.factory';
import { BooleanRadioModelFactory } from './boolean-radio-model.factory';
import { TextBoxModelFactory } from './text-box-model.factory';
import { TimeTextBoxModelFactory } from './time-text-box-model.factory';
import { LetterNameTextBoxModelFactory } from './letter-name-text-box-model.factory';
import { EmailTextBoxModelFactory } from './email-text-box-model.factory';
import { EnglishWordTextBoxModelFactory } from './english-word-text-box-model.factory';
import { MobileTextBoxModelFactory } from './mobile-text-box-model.factory';
import { ChineseWordTextBoxModelFactory } from './chinese-word-text-box-model.factory';
import { CheckboxModelFactory } from './checkbox-model.factory';
import { CheckboxTreeModelFactory } from './checkbox-tree-model.factory';
import { DateTimeLocalTextBoxModelFactory } from './date-time-local-text-box-model.factory';
import { FileModelFactory } from './file-model.factory';
import { FileTextBoxModelFactory } from './file-text-box-model.factory';
import { NumberTextBoxModelFactory } from './number-text-box-model.factory';
import { PasswordTextBoxModelFactory } from './password-text-box-model.factory';
import { RangeTextBoxModelFactory } from './range-text-box-model.factory';
import { TextAreaModelFactory } from './text-area-model.factory';
import { DropDownBoxModelFactory } from './drop-down-box-model.factory';
import { DatePickerModelFactory } from './date-picker-model.factory';
import { DateRangePickerModelFactory } from './date-range-picker-model.factory';
import { CKEditorModelFactory } from './ck-editor-model.factory';
import { ImageModelFactory } from './image-model.factory';
import { UrlTextBoxModelFactory } from './url-text-box-model.factory';
import { SpreadsheetModelFactory } from './spreadsheet-model.factory';
import { PopupRadioModelFactory } from './popup-radio-model.factory';
import { PopupCheckboxModelFactory } from './popup-checkbox-model.factory';
import { PopupTreeModelFactory } from './popup-tree-model.factory';
import { ItemListModelFactory } from './item-list-model.factory';
import { PasswordBoxModelFactory } from './password-box-model.factory';
import { LinkageBoxModelFactory } from './linkage-box-model.factory';
import { VideoModelFactory } from './video-model.factory';
import { KeywordModelFactory } from './keyword-model.factory';
import { UEditorModelFactory } from './u-editor-model.factory';
import { MdEditorModelFactory } from './md-editor-model.factory';
import { KeyValueModelFactory } from './key-value-model.factory';

/**
 * 快速表单工厂
 * 封装各个表单模型工厂，使用时无需导入他们
 *
 * @usageNotes
 *
 * ### 实例化`QuickFormFactory`对象时传参`object`
 * ### 然后调用方法实例化表单模型
 *
 * 如下示例为实例化一个时间文本框模型
 *
 * ```typescript
 * new QuickFormFactory({
 *   name: 'time-demo',
 *   label: '时间',
 *   require: true,
 *   value: '12:20',
 * }).timeTextBox();
 * ```
 *
 */
export class QuickFormFactory {
  private config: object;

  constructor(config?: object) {
    this.config = config;
  }

  /**
   * 单选按钮
   */
  radio() {
    return new RadioModelFactory(this.config).instance();
  }

  /**
   * `boolean`类型单选按钮
   */
  booleanRadio() {
    return new BooleanRadioModelFactory(this.config).instance();
  }

  /**
   * 文本框
   */
  textBox() {
    return new TextBoxModelFactory(this.config).instance();
  }

  /**
   * 时间文本框
   */
  timeTextBox() {
    return new TimeTextBoxModelFactory(this.config).instance();
  }

  /**
   * 本地日期时间文本框
   */
  dateTimeLocalTextBox() {
    return new DateTimeLocalTextBoxModelFactory(this.config).instance();
  }

  /**
   * 文件文本框
   * deprecated
   * please use file replace
   */
  fileTextBox() {
    return new FileTextBoxModelFactory(this.config).instance();
  }

  /**
   * 数字文本框
   */
  numberTextBox() {
    return new NumberTextBoxModelFactory(this.config).instance();
  }

  /**
   * 密码文本框
   */
  passwordTextBox() {
    return new PasswordTextBoxModelFactory(this.config).instance();
  }

  /**
   * 域文本框
   */
  rangeTextBox() {
    return new RangeTextBoxModelFactory(this.config).instance();
  }

  /**
   * 邮箱文本框
   */
  emailTextBox() {
    return new EmailTextBoxModelFactory(this.config).instance();
  }

  /**
   * 英文名称文本框
   */
  letterNameTextBox() {
    return new LetterNameTextBoxModelFactory(this.config).instance();
  }

  /**
   * 中文单词文本框
   */
  chineseWordTextBox() {
    return new ChineseWordTextBoxModelFactory(this.config).instance();
  }

  /**
   * 英文单词文本框
   */
  englishWordTextBox() {
    return new EnglishWordTextBoxModelFactory(this.config).instance();
  }

  /**
   * 手机号码验证器
   */
  mobileTextBox() {
    return new MobileTextBoxModelFactory(this.config).instance();
  }

  /**
   * `url`验证器
   */
  urlTextBox() {
    return new UrlTextBoxModelFactory(this.config).instance();
  }

  /**
   * 复选框
   */
  checkbox() {
    return new CheckboxModelFactory(this.config).instance();
  }

  /**
   * 复选框树
   */
  checkboxTree() {
    return new CheckboxTreeModelFactory(this.config).instance();
  }

  /**
   * 文本域
   */
  textArea() {
    return new TextAreaModelFactory(this.config).instance();
  }

  /**
   * 下拉框
   */
  dropDownBox() {
    return new DropDownBoxModelFactory(this.config).instance();
  }

  /**
   * 日期选择器
   */
  datePicker() {
    return new DatePickerModelFactory(this.config).instance();
  }

  /**
   * 日期范围选择器
   */
  dateRangePicker() {
    return new DateRangePickerModelFactory(this.config).instance();
  }

  /**
   * ck-editor
   */
  ckEditor() {
    return new CKEditorModelFactory(this.config).instance();
  }

  /**
   * 图片
   */
  image() {
    return new ImageModelFactory(this.config).instance();
  }

  spreadsheet() {
    return new SpreadsheetModelFactory(this.config).instance();
  }

  popupRadio() {
    return new PopupRadioModelFactory(this.config).instance();
  }

  popupCheckbox() {
    return new PopupCheckboxModelFactory(this.config).instance();
  }

  popupTree() {
    return new PopupTreeModelFactory(this.config).instance();
  }

  itemList() {
    return new ItemListModelFactory(this.config).instance();
  }

  /**
   * 键值对
   */
  keyValue() {
    return new KeyValueModelFactory(this.config).instance();
  }

  /**
   * 密码框
   */
  passwordBox() {
    return new PasswordBoxModelFactory(this.config).instance();
  }

  /**
   * 联动框
   */
  linkageBox() {
    return new LinkageBoxModelFactory(this.config).instance();
  }

  video() {
    return new VideoModelFactory(this.config).instance();
  }

  keyword() {
    return new KeywordModelFactory(this.config).instance();
  }

  /**
   * 文件
   */
  file() {
    return new FileModelFactory(this.config).instance();
  }

  /**
   * u-editor
   */
  uEditor() {
    return new UEditorModelFactory(this.config).instance();
  }

  /**
   * markdown-editor
   */
  mdEditor() {
    return new MdEditorModelFactory(this.config).instance();
  }
}
