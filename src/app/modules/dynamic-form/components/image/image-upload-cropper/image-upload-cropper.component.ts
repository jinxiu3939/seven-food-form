/**
 * 图片上传裁剪组件
 * depends on ngx-image-cropper module
 */
import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ImageDescription, ImageItem, ImageListOrder, CropperConfig } from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers/data/resource-provider';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'ngx-image-upload-cropper',
  templateUrl: './image-upload-cropper.component.html',
  styleUrls: [
    './image-upload-cropper.component.scss',
  ],
})
export class ImageUploadCropperComponent implements OnInit {

  @Input() config: CropperConfig;
  @Input() multiple: boolean; // 是否多选
  @Input() queueLimit: number; // 多选图片限制
  @Input() aspectRatio = { width: 4, height: 3 };
  @Input() format = 'png';

  @Output() public finish = new EventEmitter<ImageItem>(); // 图片上传完成

  @ViewChild('dialog', {static: false}) dialog;

  public imageChangedEvent: any = ''; // 文件改变事件
  public cropperVisible = false; // 裁剪容器是否可见
  private tmpThumbnail: string; // 临时保存最近一次剪切图片
  public loading: boolean; // 加载标志位
  public uploaded: string[]; // 已成功上传的图片
  public thumbnails: ImageItem[]; // 图片容器
  public uploading: number; // 成功上传的进度
  public start: boolean; // 是否准备上传
  public currentIndex: number; // 当前显示图片索引

  lang: any;

  constructor(private dialogService: NbDialogService,
              private provider: ResourceProvider,
              private http: HttpClient,
              private langProvider: LangProvider) {
    this.loading = false;
    this.uploaded = [];
    this.uploading = 0;
    this.start = false;
    this.currentIndex = 0;
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.thumbnails = [];
  }

  /**
   * 更改图片描述
   */
  desc(description: ImageDescription) {
    this.config.additionalParameter.title = description.title;
    this.thumbnails[description.index].title = description.title;
  }

  /**
   * 删除图片
   */
  delete(index: number) {
    this.uploaded = this.uploaded.filter((item) => item !== this.thumbnails[index].url); // 更新已上传列表
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key); // 删除图片
    this.progress(); // 更新进度队列 
  }

  slide(index: number) {
    this.currentIndex = index;
  }

  /**
   * 图片排序
   */
  updateOrder(list: ImageListOrder) {
    /* 改变两者的位置 */
    const tmp = this.thumbnails[list.index];
    this.thumbnails[list.index] = this.thumbnails[list.order];
    this.thumbnails[list.order] = tmp;
  }

  /**
   * 选择文件
   */
  selectedFileOnChanged(event: any) {
    this.cropperVisible = true; // 显示剪切框
    this.imageChangedEvent = event; // 加载文件
  }

  imageLoaded(image: LoadedImage) {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.tmpThumbnail = event.base64; // 临时保存剪切结果
  }

  cropperReady() {
    this.loading = false;
  }

  loadImageFailed() {
  }

  /**
   * 确认剪切结果
   */
  finishCropped() {
    const value = {url: this.tmpThumbnail, title: ''};
    if (this.multiple) { // 多选
      if (this.queueLimit) { // 限制个数
        if (this.thumbnails.length < this.queueLimit) {
          this.thumbnails.push(value); // 显示图片
        } else {
          this.alert(this.lang.max_error + this.queueLimit);
        }
      } else { // 不限制个数
        this.thumbnails.push(value); // 显示图片
      }
    } else { // 单选
      this.thumbnails = [value];
      this.uploaded = [];
    }
    this.currentIndex = this.thumbnails.length - 1; // 当前索引为最新加载的图片
    this.cropperVisible = false;
    this.progress();
    this.start = true; // 准备上传
  }

  /**
   * 上传文件
   */
  uploadFile() {
    this.loading = true; // 开始保存
    this.thumbnails.map((image, key) => {
      const form: any = this.config.additionalParameter; // 默认保存参数
      /* 输入值 */
      form.file = image.url;
      form.title = image.title;
      if (! this.uploaded.includes(form.file)) { // 避免重复保存
        this.http.post<any>(this.config.url, form, {headers: this.config.headers})
          .pipe(
            catchError(this.handleError),
          )
          .subscribe((tempRes) => {
            const result = this.provider.parseSaveResult(tempRes);
            if (result.error) {
              this.alert(result.error + `（` + key + `）`);
            } else {
              this.uploadFinish(tempRes.content, key);
            }

            if (this.thumbnails.length === this.uploaded.length) {
              this.loading = false; // 加载完毕
            }
          });
      }

      if (this.thumbnails.length === this.uploaded.length) {
        this.loading = false; // 加载完毕
      }
    });
  }

  /**
   * 上传图片完成
   */
  private uploadFinish(content, index) {
    this.finish.emit({url: content.url, title: this.thumbnails[index].title}); // 通知父组件上传完成
    this.thumbnails[index].url = content.url; // 更新图片地址
    this.uploaded.push(content.url); // 保存已上传地址，子组件更新样式
    this.progress(); // 更新进度
  }

  private progress() {
    this.uploading = this.uploaded.length / this.thumbnails.length * 100;
  }

  private alert(messge: string) {
    this.dialogService.open(this.dialog, { context: messge });
  }

  private handleError() {
    return of(false);
  }

}
