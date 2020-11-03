/**
 * 视频轮播组件
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ImageItem, ImageDescription } from '../../../dynamic-form.options';

@Component({
  selector: 'ngx-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: [
    './video-slider.component.scss',
  ],
})
export class VideoSliderComponent implements OnInit {

  @Input() items: ImageItem[]; // 所有视频
  @Input() size: string; // 尺寸
  @Input() readonly: boolean; // 是否只读
  @Input() currentIndex: number; // 当前视频
  @Input() active: string[]; // 选中视频地址

  @Output() public destroy = new EventEmitter<number>(); // 删除图片
  @Output() public edit = new EventEmitter<ImageDescription>(); // 更新图片描述
  @Output() public currentChange = new EventEmitter<number>(); // 改变当前图片

  private descriptionTerms = new Subject<string>();

  ngOnInit() {
    if (! this.currentIndex) {
      this.currentIndex = 0;
    }
    this.descriptionTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
    )
    .subscribe((v) => {
      this.edit.emit({index: this.currentIndex, title: v});
    });
  }

  desc(term: string) {
    this.descriptionTerms.next(term);
  }

  backward() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.items.length - 1;
    } else {
      this.currentIndex--;
    }
    this.currentChange.emit(this.currentIndex);
  }

  forward() {
    if (this.currentIndex === this.items.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.currentChange.emit(this.currentIndex);
  }

  delete() {
    this.destroy.emit(this.currentIndex); // 通知父组件删除元素
    /*
     * 先改变指针，然后删除本身元素，否则删除最后一个元素出错
     */
    const deleteIndex = this.currentIndex;
    if (this.currentIndex === this.items.length - 1) {
      this.currentIndex = 0;
    }
    this.items = this.items.filter((item, index) => index !== deleteIndex);
    this.currentChange.emit(this.currentIndex);
  }

}
