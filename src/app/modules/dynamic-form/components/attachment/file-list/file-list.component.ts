/**
 * 文件列表组件
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ImageItem, ImageDescription } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';

@Component({
  selector: 'sff-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: [
    './file-list.component.scss',
  ],
})
export class FileListComponent implements OnInit {

  @Input() items: ImageItem[]; // 所有文件
  @Input() readonly: boolean; // 是否只读
  @Input() drag: boolean; // 是否可拖动排序

  @Output() public destroy = new EventEmitter<number>(); // 删除文件
  @Output() public edit = new EventEmitter<ImageDescription>(); // 更新文件描述
  @Output() public order = new EventEmitter<ImageItem[]>(); // 文件排序

  lang: any;

  private descriptionTerms = new Subject<ImageDescription>();

  constructor(langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.descriptionTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),
    )
    .subscribe((description) => {
      this.edit.emit(description);
    });
  }

  desc(term: string, i: number) {
    this.descriptionTerms.next({index: i, title: term});
  }

  delete(i) {
    this.destroy.emit(i); // 通知父组件删除元素
    this.items = this.items.filter((item, index) => i !== index);
  }


  /**
   * 拖动排序
   * @param event 
   */
  drop(event: CdkDragDrop<ImageItem[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);

    this.order.emit(this.items);
  }
}
