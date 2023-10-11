/**
 * 附件文件上传
 * 支持多文件
 * 请谨慎配置max
 * 当multiple为true时，语义为：附件的个数；为false时，语义为文件路径的长度
 * 正确的做法是：multiple为true时设置max，false时不设置max，必须上传一个文件时，只需要设置必填即可
 */
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

import { formatAlertMessage } from '../../helps';
import { ImageDescription, AttachmentModel, ImageItem } from '../../dynamic-form.options';
import { LangProvider } from '../../providers/data/lang.provider';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: [
    './attachment.component.scss',
  ],
})
export class AttachmentComponent implements OnInit, ComponentReset {

  @Input() model: AttachmentModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  public thumbnails: ImageItem[]; // 显示多媒体，表单值和模型值
  public tmpFile: ImageItem[]; // 已选择的文件
  private tmpValues: string[]; // 已确认的文件地址，防重
  private windowRef: NbWindowRef;
  lang: any;

  constructor(private windowService: NbWindowService, langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.loadThumbnails();
    this.tmpFile = [];
    this.tmpValues = [];
  }

  resetModel() {
    this.loadThumbnails();
  }

  loadThumbnails() {
    if (!Array.isArray(this.model.value)) {
      this.thumbnails = [];
    } else {
      this.thumbnails = this.model.value;
    }
  }

  /**
   * 选择文件
   */
  chooseFile() {
    this.windowRef = this.windowService.open(this.contentTemplate, { title: this.lang.choose_file });
  }

  /**
   * 清空
   */
  destroyFile() {
    this.tmpValues = []; // 清空已确认地址
    this.thumbnails = [];
    this.model.value = [];
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }

  /**
   * 确认
   */
  sureFile() {
    if (!this.thumbnails) {
      this.thumbnails = [];
    }
    const tmp_file = this.tmpFile;
    if (tmp_file.length > 0) {
      if (this.model.multiple) { // 多文件
        if (this.model.max) { // 限制个数
          if (tmp_file.length <= this.model.max - this.thumbnails.length) {
            this.insertFile(tmp_file);
          }
        } else { // 无限制
          this.insertFile(tmp_file);
        }
      } else { // 单文件
        this.thumbnails = [tmp_file[0]];
      }
      this.save(); // 保存文件
      this.clear(); // 清空临时文件
    }
    this.windowRef.close();
  }

  private insertFile(images: ImageItem[]) {
    // 重复多媒体过滤
    images.forEach((image) => {
      if (! this.tmpValues.includes(image.url)) {
        this.thumbnails.push(image);
        this.tmpValues.push(image.url);
      }
    });
  }

  /**
   * 取消临时文件
   */
  cancelFile() {
    this.windowRef.close();
  }

  /**
   * 去除已确认的文件
   */
  private clear() {
    this.tmpFile = [];
  }

  /**
   * 文件选择完成
   * 监听子组件的完成事件，将选择的文件临时保存起来
   */
  submitFile(image: ImageItem) {
    if (image) {
      if (this.model.multiple) {
        if (this.model.max) { // 限制个数
          if (this.tmpFile.length <= this.model.max - this.thumbnails.length) {
            this.tmpFile.push(image);
          }
        } else { // 无限制
          this.tmpFile.push(image);
        }
      } else {
        this.tmpFile = [image];
      }
    }
  }

  /**
   * 更改文件描述
   */
  desc(description: ImageDescription) {
    this.thumbnails[description.index].title = description.title;
    this.save();
  }

  /**
   * 删除文件
   */
  delete(index: number) {
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
    this.save();
  }

  /**
   * 文件排序
   */
  order(list: ImageItem[]) {
    this.thumbnails = list;
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
        this.model.value = this.thumbnails.slice(0, 1); // 第一个文件
      }
    }
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }

  get invalid() {
    const control = this.form.controls[this.model.name];
    return control.invalid;
  }
 
  get valid() {
    const control = this.form.controls[this.model.name];
    return control.value && control.valid;
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
