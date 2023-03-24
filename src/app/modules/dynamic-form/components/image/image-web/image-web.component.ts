/**
 * 网络图片组件
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ImageDescription, ImageItem, CrawlConfig } from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers/data/resource-provider';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-image-web',
  templateUrl: './image-web.component.html',
  styleUrls: [
    './image-web.component.scss',
  ],
})
export class ImageWebComponent {

  @Input() config: CrawlConfig; // 配置
  @Input() multiple: boolean; // 是否多选
  @Input() queueLimit: number; // 多选图片限制

  @Output() public finish = new EventEmitter<ImageItem>(); // 图片抓取完成

  @ViewChild('dialog', {static: false}) dialog;

  public url: string; // 图片地址
  public tempUrl; // 临时图片地址，全路径
  public thumbnails: ImageItem[]; // 图片容器
  public loading: boolean; // 加载标志位
  public start: boolean; // 准备保存标志位
  public saving: number; // 保存进度
  public currentIndex: number; // 当前图片编号
  public submits: string[]; // 已保存的图片
  lang: any;

  constructor(private http: HttpClient, private dialogService: NbDialogService, private provider: ResourceProvider, private langProvider: LangProvider) {
    this.thumbnails = [];
    this.loading = false;
    this.start = false;
    this.saving = 0;
    this.currentIndex = 0;
    this.submits = [];
    this.lang = langProvider.lang;
  }

  /**
   * 更改图片描述
   *
   */
  desc(description: ImageDescription) {
    this.thumbnails[description.index].title = description.title;
  }

  /**
   * 删除图片
   */
  delete(index: number) {
    this.submits = this.submits.filter((item) => item !== this.thumbnails[index].url); // 删除临时队列
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key); // 删除图片
    this.progress(); // 更新进度
  }

  slide(index: number) {
    this.currentIndex = index;
  }

  /**
   * 抓取网络图片
   */
  crawl() {
    if (this.tempUrl !== this.url) {
      this.loading = true;
    }
    this.tempUrl = this.url;
  }

  /**
   * 清空输入重新抓取
   */
  clear() {
    this.url = '';
  }

  /**
   * 图片加载成功
   */
  loadImage() {
    const value = {
      url: this.url,
      title: this.url.substring(this.url.lastIndexOf('/') + 1), // 获取文件名称做默认标题
    };

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
      this.submits = [];
    }

    this.currentIndex = this.thumbnails.length - 1; // 当前索引为最新加载的图片
    this.start = true; // 准备保存
    this.progress(); // 更新进度
    this.loading = false; // 图片加载完成
  }

  /**
   * 图片加载异常
   */
  loadError() {
    this.alert(this.lang.grab_image_error);
    this.loading = false;
  }

  private progress() {
    this.saving = this.submits.length / this.thumbnails.length * 100;
  }

  /**
   * 保存图片资源
   */
  save() {
    this.loading = true; // 开始保存
    this.thumbnails.map((image, key) => {
      const form: any = this.config.additionalParameter; // 默认保存参数
      /* 输入值 */
      form.url = image.url;
      form.title = image.title;
      if (! this.submits.includes(form.url)) { // 避免重复保存
        this.http.post<any>(this.config.api, form, {headers: this.config.headers})
          .pipe(
            catchError(this.handleError),
          )
          .subscribe((tempRes) => {
            const result = this.provider.parseSaveResult(tempRes);
            if (result.error) {
              this.alert(result.error + `（` + form.title.substring(0, 20) + `）`);
            } else {
              this.saveFinish(tempRes.content, key);
            }

            if (this.thumbnails.length === this.submits.length) {
              this.loading = false; // 加载完毕
            }
          });
      }

      if (this.thumbnails.length === this.submits.length) {
        this.loading = false; // 加载完毕
      }
    });
  }

  private saveFinish(content, index) {
    this.finish.emit({url: content.url, title: this.thumbnails[index].title}); // 通知父组件
    this.thumbnails[index].url = content.url; // 更新url
    this.submits.push(content.url); // 记录已保存的地址，更新子组件样式
    this.progress(); // 更新进度
  }

  private handleError() {
    return of(false);
  }

  private alert(messge: string) {
    this.dialogService.open(this.dialog, { context: messge });
  }

}
