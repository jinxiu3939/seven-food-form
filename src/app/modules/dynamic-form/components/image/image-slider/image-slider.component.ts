/**
 * 多图轮播组件
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ImageItem, ImageDescription, ImageListOrder } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'ngx-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: [
    './image-slider.component.scss',
  ],
})
export class ImageSliderComponent implements OnInit {

  @Input() items: ImageItem[]; // 所有图片
  @Input() size: string; // 图片尺寸
  @Input() readonly: boolean; // 是否只读
  @Input() currentIndex: number; // 当前图片
  @Input() active: string[]; // 选中图片地址

  @Output() public destroy = new EventEmitter<number>(); // 删除图片
  @Output() public edit = new EventEmitter<ImageDescription>(); // 更新图片描述
  @Output() public currentChange = new EventEmitter<number>(); // 改变当前图片
  @Output() public order = new EventEmitter<ImageListOrder>(); // 图片排序

  lang: any;

  private descriptionTerms = new Subject<string>();

  constructor(private windowService: NbWindowService, private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

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
    .subscribe((image) => {
      this.edit.emit({index: this.currentIndex, title: image});
    });
  }

  desc(term: string) {
    this.descriptionTerms.next(term);
  }

  /**
   * 查看大图
   * @param url 查看大图
   */
  bigImage(imageTemplate) {
    this.windowService.open(
      imageTemplate,
      {
        title: this.lang.preview_big_image,
        context: {
          src: this.items[this.currentIndex].url,
        },
      },
    );
  }

  backward() {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.items.length - 1;
    } else {
      this.currentIndex--;
    }
    this.currentChange.emit(this.currentIndex);
  }

  forward() {
    if (this.currentIndex >= this.items.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.currentChange.emit(this.currentIndex);
  }

  delete() {
    this.destroy.emit(+this.currentIndex); // 通知父组件删除元素
    /*
     * 先改变指针，然后删除本身元素，否则删除最后一个元素出错
     */
    const deleteIndex = +this.currentIndex;
    if (this.currentIndex >= this.items.length - 1) {
      this.currentIndex = 0;
    }
    this.items = this.items.filter((item, index) => deleteIndex !== index);
    this.currentChange.emit(this.currentIndex);
  }

  upward() {
    const start = +this.currentIndex;
    this.backward();
    const end = +this.currentIndex;
    this.swapItems(start, end);
    this.order.emit({ index: start, order: end });
  }

  downward() {
    const start = +this.currentIndex;
    this.forward();
    const end = +this.currentIndex;
    this.swapItems(start, end);
    this.order.emit({ index: start, order: end });
  }

  /*
   * 改变两者的位置
   */
  private swapItems(start, end) {
    [this.items[start], this.items[end]] = [this.items[end], this.items[start]];
  }

}
