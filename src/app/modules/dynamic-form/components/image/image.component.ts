/**
 * 图片
 * 支持多图片
 * 请谨慎配置max
 * 当multiple为true时，语义为：图片的个数；为false时，语义为文件路径的长度
 * 正确的做法是：multiple为true时设置max，false时不设置max，只能上传一个文件，只需要设置必填即可
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { formatAlertMessage } from '../../helps';
import { ComponentReset } from '../../providers/interface/component-reset';
import { ImageDescription, ImageModel, ImageItem, ImageListOrder } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';

@Component({
  selector: 'sff-image',
  templateUrl: './image.component.html',
  styleUrls: [
    './image.component.scss',
  ],
})
export class ImageComponent implements OnInit, ComponentReset {

  @Input() model: ImageModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public currentIndex = 0;
  public thumbnails: ImageItem[]; // 显示图片，表单值和模型值
  public tmpImage: ImageItem[]; // 已选择的图片/待选图片
  public tmpFilter: number[]; // 筛选过的图片编号/确定图片
  private tmpValues: string[]; // 已插入的图片地址/表单值
  private windowRef: NbWindowRef;
  lang: any;

  constructor(private windowService: NbWindowService, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.loadThumbnails();
    this.tmpImage = [];
    this.tmpValues = [];
  }

  resetModel() {
    this.loadThumbnails();
    this.tmpImage = [];
    this.tmpValues = [];
  }

  loadThumbnails() {
    if (this.model.value && typeof this.model.value === 'string') {
      this.thumbnails = [{url: this.model.value, title: ''}];
    } else if (this.model.value) {
      this.thumbnails = this.model.value as ImageItem[];
    } else {
      this.thumbnails = [];
    }
  }

  /**
   * 选择图片
   */
  chooseImage() {
    this.windowRef = this.windowService.open(this.contentTemplate, { title: `选择图片` });
  }

  /**
   * 清空图片
   */
  destroyImage() {
    this.thumbnails = [];
    this.model.value = null;
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  /**
   * 确认图片
   * 设置表单值
   */
  sureImage() {
    if (!this.thumbnails) {
      this.thumbnails = [];
    }

    const tmpImage = this.tmpImage.filter((tmp, index) => {
      if (this.tmpFilter) { // 过滤取消的图片
        return this.tmpFilter.includes(index);
      } else { // 不过滤
        return true;
      }
    });
    if (tmpImage.length > 0) {
      if (this.model.multiple) { // 多图片
        this.insertImage(tmpImage);
      } else { // 单图
        this.thumbnails = [tmpImage[0]];
      }
      this.save(); // 保存图片
      this.clear(); // 清空临时图片
    }
    this.windowRef.close();
  }

  private insertImage(images: ImageItem[]) {
    if (this.model.repeat) { // 可以重复
      this.thumbnails = this.thumbnails.concat(images);
    } else { // 不可以重复
      images.forEach((image) => {
        if (! this.tmpValues.includes(image.url)) {
          this.thumbnails.push(image);
          this.tmpValues.push(image.url);
        }
      });
    }
    this.currentIndex = this.thumbnails.length - 1;
  }

  /**
   * 取消临时图片
   */
  cancelImage() {
    this.tmpFilter = null; // 取消临时选择操作
    this.windowRef.close();
  }

  private clear() {
    // 去除已确认的图片
    this.tmpImage = this.tmpImage.filter((value) => !this.thumbnails.includes(value));
    this.tmpFilter = null; // 清空临时选择操作
  }

  /**
   * 图片选择完成
   * 监听子组件的完成事件，将选择的图片临时保存起来
   */
  submitImage(image: ImageItem) {
    if (image) {
      if (this.model.multiple) {
        this.cache(image);
      } else {
        this.tmpImage = [image];
      }
    }
  }

  /**
   * 图片缓存起来
   */
  private cache(image) {
    const exists = this.tmpImage.filter((value) => value.url === image.url)
    if (exists.length === 0) {
      this.tmpImage.push(image);
      if (this.tmpFilter) {
        this.tmpFilter.push(this.tmpImage.length - 1);
      }
    }
  }

  /**
   * 更改图片描述
   */
  desc(description: ImageDescription) {
    this.thumbnails[description.index].title = description.title;
    this.save();
  }

  /**
   * 删除图片
   */
  delete(index: number) {
    this.tmpValues = this.tmpValues.filter((item) => item !== this.thumbnails[index].url);
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
    this.save();
  }

  slide(index: number) {
    this.currentIndex = index;
  }

  /**
   * 图片排序
   */
  order(list: ImageListOrder) {
    /* 改变两者的位置 */
    [this.thumbnails[list.index], this.thumbnails[list.order]] = [this.thumbnails[list.order], this.thumbnails[list.index]];
    this.save();
  }

  /**
   * 保存表单值
   */
  private save() {
    if (this.model.multiple) { // 多图
      this.model.value = this.thumbnails; // 模型赋值
    } else { // 单图
      if (this.thumbnails.length > 0) {
        this.model.value = this.thumbnails[0].url; // 第一个图片的地址
      }
    }
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }

  /**
   * 更改临时图片
   */
  changeImage(list: number[]) {
    this.tmpFilter = list;
  }

  get thumbs() {
    if (this.form.controls[this.model.name].value) {
      return this.thumbnails;
    } else {
      return [];
    }
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.value && control.invalid;
  }
 
  get errors() {
    const message = [];
    const control = this.form.controls[this.model.name];
    if (this.model.min > 0 && control.value && this.model.min > control.value.length) {
      message.push(formatAlertMessage(this.lang.choose_down, [this.model.min]));
    } else if (this.model.max > 0 && control.value && control.value.length > this.model.max) {
      message.push(formatAlertMessage(this.lang.choose_up, [this.model.max]));
    }
    return message;
  }
}
