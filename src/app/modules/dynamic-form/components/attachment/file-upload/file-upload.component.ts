/**
 * 多文件上传组件
 * depends on ng2-file-upload module
 */
import { Component, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FileUploader } from 'ng2-file-upload';

import { formatAlertMessage } from '../../../helps';
import { ImageDescription, ImageItem, UploadConfig } from '../../../dynamic-form.options';
import { ResourceProvider } from '../../../providers/data/resource-provider';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [
    './file-upload.component.scss',
  ],
})
export class FileUploadComponent implements OnInit {

  @Input() config: UploadConfig;
  @Input() multiple: boolean;
  @Input() top: number = 5; // 队列极限值

  @Output() public finish = new EventEmitter<ImageItem>(); // 文件上传完成

  @ViewChild('dialog', {static: false}) dialog;

  public uploader: FileUploader;
  public loading: boolean; // 上传中标志位
  public uploaded: string[]; // 已成功上传的文件
  public thumbnails: ImageItem[]; // 文件
  public max: number; // 可上传文件个数
  public uploading: number; // 上传成功的进度
  public start: boolean; // 是否准备上传
  private tmpQueue: string[]; // 临时文件队列
  tip: string = ''; // 提醒
  lang: any;

  constructor(private dialogService: NbDialogService, private provider: ResourceProvider, langProvider: LangProvider) {
    this.loading = false;
    this.uploaded = [];
    this.uploading = 0;
    this.start = false;
    this.tmpQueue = [];
    this.uploader = new FileUploader({});
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.thumbnails = [];
    this.uploader.setOptions(this.config);
    this.setTipMessage();
  }

  /**
   * 更改文件描述
   * 标题在配置时是通用的，上传是无法更改标题
   * [todo] 上传文件时描述无法对号入座
   */
  desc(description: ImageDescription) {
    this.config.additionalParameter.title = description.title;
    this.thumbnails[description.index].title = description.title;
  }

  /**
   * 删除文件
   */
  delete(index: number) {
    // 删除临时队列
    this.popFileQueue(this.uploader.queue[index]._file.name, index);
    // 删除文件队列
    this.uploader.removeFromQueue(this.uploader.queue[index]);
    // 更新进度队列
    this.uploaded = this.uploaded.filter((item) => item !== this.thumbnails[index].url);
    this.progress();
    // 删除文件
    this.thumbnails = this.thumbnails.filter((item, key) => index !== key);
  }

  /**
   * 选择文件
   * 每次选择文件后，文件队列会刷新，因此使用`tmpQueue`保存原队列
   */
  selectedFileOnChanged(event: any) {
    if (this.uploader.queue.length === 0) {
      this.alert(formatAlertMessage(this.lang.choose_file_error, [
        formatAlertMessage(this.lang.type_or_size_error, [this.config.maxFileSize / 1024 / 1024 + 'M'])
      ]));
      return ;
    }
    this.uploader.queue.forEach((queue, index) => {
      /* 不能根据`thumbnails`判断队列是否已存在，因为`thumbnails`的`url`和`title`会变化 */
      if (! this.inFileQueue(queue._file.name, index)) {
        this.pushFileQueue(queue._file.name, index); // 加入临时队列
        this.thumbnails.push({url: '', title: queue._file.name}); // 预览
      }
    });
    /* 最大可上传个数 */
    if (this.multiple) {
      if (this.top < this.uploader.queue.length) {
        this.max = this.top; // 限制文件个数
        this.alert(formatAlertMessage(this.lang.upload_queue_limit, [this.top]));
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
        if (status === 200) { // 上传成功
          /* 上传结果处理 */
          try {
            const tempRes = JSON.parse(response);
            const result = $this.provider.parseUploadResult(tempRes);
            if (result.error) {
              $this.alert(result.error);
            } else {
              $this.uploadFinish(result, index);
            }
          } catch (e) {
            $this.alert(formatAlertMessage($this.lang.upload_file_error, [queue._file.name.substring(0, 20), $this.lang.other]));
          }
        } else {
          $this.alert(formatAlertMessage($this.lang.upload_file_error, [queue._file.name.substring(0, 20), $this.lang.type_or_size_error + status]));
        }
      };
      queue.onError = (response, status, headers) => {
        if (status === 401) {
          $this.alert($this.lang.upload_auth_error);
        } else {
          $this.alert(formatAlertMessage($this.lang.upload_file_error, [queue._file.name.substring(0, 20), $this.lang.system_busy + status]));
        }
      };
      queue.onComplete = (response, status, headers) => {
        completed++; // 计数加一
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
          this.uploader.queue[this.uploader.queue.length - 1].upload(); // 只上传最后一个文件
        }
      }
    }
  }

  /**
   * 上传文件完成
   */
  private uploadFinish(content, index) {
    this.finish.emit({url: content.url, title: this.thumbnails[index].title}); // 通知父组件上传完成
    this.thumbnails[index].url = content.url; // 更新文件地址
    this.uploaded.push(content.url); // 保存已上传地址，子组件更新样式
    this.progress(); // 更新进度
  }

  private progress() {
    this.uploading = this.uploaded.length / this.max * 100;
  }

  private alert(message: string) {
    this.dialogService.open(this.dialog, { context: message });
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

  /**
   * 设置友情提示信息
   */
  private setTipMessage() {
    let str_type = '';
    this.config.allowedFileType.map((type, i) => {
      str_type += i > 0 ? ',' : '';
      str_type += this.lang['file_type_' + type];
    });
    this.tip = formatAlertMessage(this.lang.upload_tip, [str_type, this.config.maxFileSize / 1024 / 1024 + 'M']);
  }
}
