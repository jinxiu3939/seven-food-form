/**
 * 图片上传组件
 * depends on ng2-file-upload module
 */
import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FileUploader } from 'ng2-file-upload';

import { ImageDescription, ImageItem, ImageListOrder, UploadConfig } from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers/data/resource-provider';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'ngx-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: [
    './image-upload.component.scss',
  ],
})
export class ImageUploadComponent implements OnInit {

  @Input() config: UploadConfig;
  @Input() debug: boolean;
  @Input() multiple: boolean;
  @Input() top: number = 50; // 队列极限值

  @Output() public finish = new EventEmitter<ImageItem>(); // 图片上传完成

  @ViewChild('dialog', {static: false}) dialog;

  public uploader: FileUploader;
  public loading: boolean; // 上传中标志位
  public uploaded: string[]; // 已成功上传的图片
  public thumbnails: ImageItem[]; // 图片
  public max: number; // 可上传文件个数
  public uploading: number; // 上传成功的进度
  public start: boolean; // 是否准备上传
  public currentIndex: number; // 当前编号
  private tmpQueue: string[]; // 临时文件队列

  lang: any;

  constructor(private dialogService: NbDialogService, private provider: ResourceProvider, private langProvider: LangProvider) {
    this.loading = false;
    this.uploaded = [];
    this.uploading = 0;
    this.start = false;
    this.tmpQueue = [];
    this.currentIndex = 0;
    this.uploader = new FileUploader({});
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.thumbnails = [];
    this.uploader.setOptions(this.config);
    if (this.debug) {
      console.log('ImageUploadComponent initialization completed.');
    }
  }

  /**
   * 更改图片描述
   * 标题在配置时是通用的，上传时无法更改标题
   * [todo] 上传图片时描述无法对号入座
   */
  desc(description: ImageDescription) {
    this.config.additionalParameter.title = description.title;
    this.thumbnails[description.index].title = description.title;
  }

  /**
   * 删除图片
   */
  delete(index: number) {
    // 删除临时队列
    this.popFileQueue(this.uploader.queue[index]._file.name, index);
    // 删除文件队列
    this.uploader.removeFromQueue(this.uploader.queue[index]);
    // 更新进度队列
    this.uploaded = this.uploaded.filter((item) => item !== this.thumbnails[index].url);
    this.progress();
    // 删除轮播图片
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
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
   * 每次选择文件后，文件队列会刷新，因此使用`tmpQuene`保存原队列
   */
  selectedFileOnChanged(event: any) {
    if (this.uploader.queue.length === 0) {
      this.alert(this.lang.choose_image_error + `（` + this.lang.type_or_size_error + this.config.maxFileSize / 1024 / 1024 + `M）`);
      return ;
    }
    this.uploader.queue.forEach((queue, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(queue._file);
      reader.onload = () => {
        /* 不能根据`thumbnails`判断队列是否已存在，因为`thumbnails`的`url`和`title`会变化 */
        if (! this.inFileQueue(queue._file.name, index)) {
          this.pushFileQueue(queue._file.name, index); // 加入临时队列
          this.thumbnails.push({url: reader.result, title: queue._file.name}); // 预览
          this.currentIndex = this.thumbnails.length - 1; // 改变当前页
        }
      };
    });
    /* 最大可上传个数 */
    if (this.multiple) {
      if (this.top < this.uploader.queue.length) {
        this.max = this.top; // 限制文件个数
      } else {
        this.max = this.uploader.queue.length; // 全部文件
      }
    } else {
      this.max = 1; // 单个文件
    }
    this.start = true; // 准备上传
    this.progress(); // 更新进度
  }

  /**
   * 上传文件
   */
  uploadFile() {
    let completed = 0; // 每次上传完成的个数，临时计数
    this.uploader.queue.forEach((queue, index) => {
      if (queue.isUploaded) {
        completed++; // 计数加一
      }
      const $this = this;
      queue.onSuccess = (response, status, headers) => {
        $this.uploadSuccess(response, status, index, queue._file.name.substring(0, 20))
      };
      queue.onError = (response, status, headers) => {
        if (status === 401) {
          $this.alert($this.lang.upload_auth_error);
        } else {
          $this.alert($this.lang.upload_image_error + `（` + $this.lang.system_busy + `）（` + status + `）（ ` + queue._file.name.substring(0, 20) + ` ）`);
        }
      };
      queue.onComplete = (response, status, headers) => {
        completed++; // 计数加一
        $this.currentIndex = index; // 改变当前图片
        if (completed === $this.max) {
          $this.loading = false;
        }
      };
    });
    if (this.max > this.uploaded.length) {  // 可继续上传
      if (completed < this.uploader.queue.length) { // 未上传完成
        /* 开始上传 */
        this.loading = true;
        if (this.multiple) { // 多文件上传
          if (this.uploader.queue.length <= this.top) {
            this.uploader.uploadAll(); // 全部上传
          } else {
            // 限定上传文件个数
            for (let i = 1; i <= this.top; i++) {
              this.uploader.queue[this.uploader.queue.length - i].upload(); // 从后往前上传
            }
          }
        } else { // 单文件上传
          this.uploader.queue[this.currentIndex].upload(); // 只上传当前文件
        }
      }
    }
  }

  /**
   * 上传图片成功
   * @param response 
   * @param status 
   * @param index 
   * @param file_name 
   */
  private uploadSuccess(response, status, index, file_name) {
    // 上传成功
    if (status === 200) {
      /* 上传结果处理 */
      try {
        const tempRes = JSON.parse(response);
        const result = this.provider.parseUploadResult(tempRes);
        if (result.error) {
          this.alert(result.error);
        } else {
          this.uploadFinish(result, index);
        }
      } catch (e) {
        this.alert(this.lang.upload_image_error + `（` + this.lang.system_busy + `）（ ` + file_name + ` ）`);
      }
    } else {
      this.alert(this.lang.upload_image_error + `（` + this.lang.type_or_size_big_error + `）（ ` + file_name + ` ）`);
    }
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
    this.uploading = this.uploaded.length / this.max * 100;
  }

  private alert(messge: string) {
    this.dialogService.open(this.dialog, { context: messge });
  }

  private inFileQueue(file: string, index: number) {
    return this.tmpQueue.includes(file + '::' + index);
  }

  private pushFileQueue(file: string, index: number) {
    this.tmpQueue.push(file + '::' + index);
  }

  private popFileQueue(file: string, index: number) {
    this.tmpQueue = this.tmpQueue.filter((queue) => queue !== file + '::' + index);
  }

}
