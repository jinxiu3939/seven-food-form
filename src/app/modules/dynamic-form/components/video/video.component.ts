/**
 * 图片
 * 支持多图片
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { ImageDescription, VideoModel, ImageItem } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-video',
  templateUrl: './video.component.html',
  styleUrls: [
    './video.component.scss',
  ],
})
export class VideoComponent implements OnInit {

  @Input() model: VideoModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public thumbnails: ImageItem[]; // 显示视频，表单值和模型值
  public tmpImage: ImageItem[]; // 已选择的视频
  public tmpFilter: number[]; // 筛选编号
  private tmpValues: string[]; // 已确认的视频地址
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
   * 选择视频
   */
  chooseVideo() {
    this.windowRef = this.windowService.open(this.contentTemplate, { title: `选择视频` });
  }

  /**
   * 清空
   */
  destroyVideo() {
    this.thumbnails = [];
    this.model.value = null;
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  /**
   * 确认
   */
  sureVideo() {
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
      if (this.model.multiple) { // 多视频
        if (this.model.max) { // 限制个数
          if (tmpImage.length <= this.model.max - this.thumbnails.length) {
            this.insertVideo(tmpImage);
          }
        } else { // 无限制
          this.insertVideo(tmpImage);
        }
      } else { // 单视频
        this.thumbnails = [tmpImage[0]];
      }
      this.save(); // 保存视频
      this.clear(); // 清空临时视频
    }
    this.windowRef.close();
  }

  private insertVideo(images: ImageItem[]) {
    // 重复视频过滤
    images.forEach((image) => {
      if (! this.tmpValues.includes(image.url)) {
        this.thumbnails.push(image);
        this.tmpValues.push(image.url);
      }
    });
  }

  /**
   * 取消临时视频
   */
  cancelVideo() {
    this.tmpFilter = null; // 取消临时选择操作
    this.windowRef.close();
  }

  private clear() {
    // 去除已确认的视频
    this.tmpImage = this.tmpImage.filter((value) => !this.thumbnails.includes(value));
    this.tmpFilter = null; // 清空临时选择操作
  }

  /**
   * 视频选择完成
   * 监听子组件的完成事件，将选择的视频临时保存起来
   */
  submitVideo(image: ImageItem) {
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
   * 更改视频描述
   */
  desc(description: ImageDescription) {
    this.thumbnails[description.index].title = description.title;
    this.save();
  }

  /**
   * 删除视频
   */
  delete(index: number) {
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
    this.save();
  }

  /**
   * 保存表单值
   */
  private save() {
    if (this.model.multiple) { // 多
      this.model.value = this.thumbnails; // 模型赋值
    } else { // 单
      if (this.thumbnails.length > 0) {
        this.model.value = this.thumbnails[0].url; // 第一个图片的地址
      }
    }
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }

  /**
   * 更改临时视频
   */
  changeVideo(list: number[]) {
    this.tmpFilter = list;
  }

}
