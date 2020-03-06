/**
 * 网络图片组件
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ImageDescription, ImageItem, CrawlConfig } from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers';

@Component({
  selector: 'ngx-image-web',
  templateUrl: './image-web.component.html',
  styleUrls: [
    './image-web.component.scss',
  ],
})
export class ImageWebComponent {

  @Input() config: CrawlConfig; // 配置
  @Input() multiple: boolean; // 是否多选

  @Output() public finish = new EventEmitter<ImageItem>(); // 图片抓取完成

  @ViewChild('dialog', {static: false}) dialog;

  public url: string; // 图片地址
  public tempUrl; // 临时图片地址，全路径
  public thumbnails: ImageItem[]; // 图片缩略图
  public loading: boolean; // 加载标志位
  public start: boolean; // 准备保存标志位
  public saving: number; // 保存进度
  public currentIndex: number; // 当前图片编号
  public max: number; // 最大可保存图片数量
  public submits: string[]; // 已保存的图片

  constructor(private http: HttpClient, private dialogService: NbDialogService, private provider: ResourceProvider) {
    this.thumbnails = [];
    this.loading = false;
    this.start = false;
    this.saving = 0;
    this.currentIndex = 0;
    this.submits = [];
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
    // 删除临时队列
    this.submits = this.submits.filter((item) => item !== this.thumbnails[index].url);
    // 更新进度
    this.progress();
    // 删除轮播图片
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
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
    this.thumbnails.push(value); // 显示图片
    this.currentIndex = this.thumbnails.length - 1;
    if (this.multiple) { // 多选
      if (this.config.queueLimit) { // 限制个数
        this.max = this.thumbnails.length < this.config.queueLimit ? this.thumbnails.length : this.config.queueLimit;
      } else { // 不限制个数
        this.max = this.thumbnails.length;
      }
    } else { // 单选
      this.max = 1;
    }
    this.start = true; // 准备保存
    this.progress(); // 更新进度
    this.loading = false; // 图片加载完成
  }

  /**
   * 图片加载异常
   */
  loadError() {
    this.alert(`抓取图片失败`);
    this.loading = false;
  }

  private progress() {
    this.saving = this.submits.length / this.max * 100;
  }

  /**
   * 保存图片资源
   */
  save() {
    if (this.canSave()) { // 第二次进入时需判断
      this.loading = true; // 开始保存
      /* 筛选待保存数组 */
      const waitingSave: {key: number, thumb: ImageItem}[] = [];
      this.thumbnails.map((thumb, key) => {
        /* 从当前图片位置开始依次保存 */
        let flag = false; // 是否可保存标志位
        if (this.currentIndex + this.max < this.thumbnails.length) {
          if (key >= this.currentIndex && key < this.currentIndex + this.max) {
            flag = true;
          }
        } else {
          if (key >= this.currentIndex || key < this.currentIndex + this.max - this.thumbnails.length) {
            flag = true;
          }
        }
        if (flag) {
          waitingSave.push({key, thumb}); // 键必须保存
        }
      });
      let tmpNumber = 0; // 本次保存完成的图片临时计数
      waitingSave.forEach((image) => {
        tmpNumber++;
        const form: any = this.config.additionalParameter; // 默认保存参数
        /* 输入值 */
        form.url = image.thumb.url;
        form.title = image.thumb.title;
        if (this.canSave() && ! this.submits.includes(form.url)) { // 避免重复保存
          this.http.post<any>(this.config.api, form).pipe(
            catchError(this.handleError),
          ).subscribe((tempRes) => {
            if (Math.min(this.thumbnails.length, this.max) === tmpNumber) {
              this.loading = false; // 加载完毕
            }
            if (this.canSave()) { // 异步请求有延迟，尽管可以提交到接口，但是本次提交对界面无影响
              const result = this.provider.parseSaveResult(tempRes);
              if (result.error) {
                this.alert(result.error + `（` + form.title.substring(0, 20) + `）`);
              } else {
                this.saveFinish(tempRes.content, image.key);
              }
            } else {
              this.loading = false;
            }
          });
        } else {
          this.loading = false;
        }
      });
    }
  }

  private canSave() {
    return this.submits.length < this.max;
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
