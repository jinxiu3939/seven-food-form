/**
 * 临时图片列表
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageItem } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-image-cache',
  templateUrl: './image-cache.component.html',
  styleUrls: [
    './image-cache.component.scss',
  ],
})
export class ImageCacheComponent {

  @Input() images: ImageItem[];

  @Output() public active = new EventEmitter<number[]>(); // 选中

  public deleted: number[] = []; // 取消的资源
  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  /**
   * 选择
   */
  choose(id: number) {
    if (this.deleted.indexOf(id) >= 0) {
      this.select(id);
    } else {
      this.cancel(id);
    }
  }

  /**
   * 选中
   */
  private select(file: number) {
    this.deleted = this.deleted.filter((k) => k !== file);
    this.change();
  }

  /**
   * 取消
   */
  private cancel(file: number) {
    this.deleted.push(file);
    this.change();
  }

  private change() {
    const selected = [];
    this.images.forEach((image, key) => {
      if (!this.deleted.includes(key)) {
        selected.push(key);
      }
    });
    this.active.emit(selected);
  }

}
