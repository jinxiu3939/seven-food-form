/**
 * 图片
 * 支持多图片
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { ImageDescription, ImageModel, ImageItem } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-image',
  templateUrl: './image.component.html',
  styleUrls: [
    './image.component.scss',
  ],
})
export class ImageComponent implements OnInit {

  @Input() model: ImageModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public thumbnails: ImageItem[]; // 显示图片，表单值和模型值
  public tmpImage: ImageItem[]; // 已选择的图片
  public tmpFilter: number[]; // 筛选编号
  private tmpValues: string[]; // 已确认的图片地址
  private windowRef: NbWindowRef;

  constructor(private windowService: NbWindowService) {
  }

  ngOnInit() {
    if (this.model.value && typeof this.model.value === 'string') {
      this.thumbnails = [{url: this.model.value, title: ''}];
    } else {
      this.thumbnails = this.model.value as ImageItem[];
    }
    this.tmpImage = [];
    this.tmpValues = [];
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
   */
  sureImage() {
    if (!this.thumbnails) {
      this.thumbnails = [];
    }
    const tmpImage = this.tmpImage.filter((tmp, index) => {
      if (this.tmpFilter) {
        return this.tmpFilter.includes(index);
      } else { // 不过滤
        return true;
      }
    });
    if (tmpImage.length > 0) {
      if (this.model.multiple) { // 多图片
        if (this.model.max) { // 限制个数
          if (tmpImage.length <= this.model.max - this.thumbnails.length) {
            this.insertImage(tmpImage);
          }
        } else { // 无限制
          this.insertImage(tmpImage);
        }
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
      this.thumbnails.concat(images);
    } else { // 不可以重复
      images.forEach((image) => {
        if (! this.tmpValues.includes(image.url)) {
          this.thumbnails.push(image);
          this.tmpValues.push(image.url);
        }
      });
    }
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
        if (this.model.max) { // 限制个数
          if (this.tmpImage.length <= this.model.max - this.thumbnails.length) {
            this.tmpImage.push(image);
          }
        } else { // 无限制
          this.tmpImage.push(image);
        }
      } else {
        this.tmpImage = [image];
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
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
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

}
